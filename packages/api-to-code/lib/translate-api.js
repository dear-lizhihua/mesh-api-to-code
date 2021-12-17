const {camelCase, capitalize} = require('lodash')

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
          const isHeader = parameter.in === 'header'
          if (parameter.in === 'header') {
            const propertyIsContentDisposition = parameter.name.includes('Content-Disposition')
            const valueIsAttachment = parameter.default.includes('attachment')
            // console.log(parameter, isHeader, propertyIsContentDisposition, valueIsAttachment)
            if (isHeader && propertyIsContentDisposition && valueIsAttachment) options.isContentDispositionAttachment = true
            else options.isContentDispositionAttachment = false
          }
        })
      }
      methodName = method + capitalize(methodName.slice(0, 1)) + methodName.slice(1)
      contextModule.string.methods += concatFunctionMap[method](methodName, path, options)
    })
  })
  contextModule.string.code = contextModule.string.concatPrefixUrl + concatWrapperClassName(contextModule.string.constructor, contextModule.string.methods)
}
const mapPaths = (paths, callback) => {
  for (const {path, value} of paths) {
    const methodDefinitions = value
    const methodName = camelCase(path)
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
