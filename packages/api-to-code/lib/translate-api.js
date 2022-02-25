const {camelCase, capitalize} = require('lodash')
const {pathToRegexp} = require('path-to-regexp')

const {
  concatPrefixUrl, concatWrapperClassName, concatConstructor, concatFunctionMap,
} = require('./concat')

module.exports = (contextModule) => {
  contextModule.string.concatPrefixUrl = concatPrefixUrl()
  contextModule.string.constructor = concatConstructor()
  const paths = contextModule.moduleValues.map(path => ({path, value: contextModule.data.paths[path]}))
  mapPaths(paths, ({path, methodName, methodDefinitions}) => {
    mapMethods(methodDefinitions, ({method, methodDefinition}) => {
      const options = Object.create(null)
      // 方法名称
      if (methodDefinition.parameters.length !== 0) {
        methodDefinition.parameters.map(parameter => {
          if (parameter.in === 'header') {
            const propertyIsContentDisposition = parameter.name.includes('Content-Disposition')
            if (propertyIsContentDisposition) {
              const valueIsAttachment = parameter.default.includes('attachment')
              if (valueIsAttachment) options.isContentDispositionAttachment = true
              else options.isContentDispositionAttachment = false
            } else options.isContentDispositionAttachment = false

            const propertyIsContentType = parameter.name.includes('Content-Type')
            if (propertyIsContentType) {
              const valueIsMultipartFormData = parameter.default.includes('multipart/form-data')
              if (valueIsMultipartFormData) options.isContentTypeMultipartFormData = true
              else options.isContentTypeMultipartFormData = false
            } else options.isContentTypeMultipartFormData = false
          }
        })
      }
      const fullMethodName = method + capitalize(methodName.slice(0, 1)) + methodName.slice(1)
      contextModule.string.methods += concatFunctionMap[method](fullMethodName, path, options)
    })
  })
  contextModule.string.code = contextModule.string.concatPrefixUrl + concatWrapperClassName(contextModule.string.constructor, contextModule.string.methods)
}
const mapPaths = (paths, callback) => {
  for (const {path, value} of paths) {
    const methodDefinitions = value
    const keys = [];
    pathToRegexp(path, keys)
    let methodName = ''
    if (keys.length === 0) { // 未解析出路径参数
      methodName = path
    } else {
      keys.forEach(key => {
        const capitalizedKey = capitalize(key.name.slice(0, 1)) + key.name.slice(1)
        methodName = path.replace(`:${key.name}`, `By${capitalizedKey}`)
      })
    }
    methodName = camelCase(methodName)
    callback({path, methodName, methodDefinitions})
  }
}
const mapMethods = (methodDefinitions, callback) => {
  const methods = Object.keys(methodDefinitions)
  for (const method of methods) {
    const methodDefinition = methodDefinitions[method]
    callback({method, methodDefinition})
  }
}
