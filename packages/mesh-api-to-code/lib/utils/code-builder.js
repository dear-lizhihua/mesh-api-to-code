import lodash from 'lodash'
import { pathToRegexp } from 'path-to-regexp'

const {camelCase, capitalize} = lodash
import generator from '@babel/generator'
import buildFile from './build-file.js'
import buildPrefixUrl from './build-prefix-url.js'
import buildClass from './build-class.js'
import buildClassConstructor from './build-class-constructor.js'
import buildClassMethod from './build-class-method.js'
import buildClassArgument from './build-argument.js'
import buildClassBody from './build-call.js'

export default (contextModule) => {
  const paths = contextModule.moduleValues.map(path => ({path, value: contextModule.data.paths[path]}))

  const file = buildFile()
  const prefixUrl = buildPrefixUrl()
  const clazz = buildClass()
  const classConstructor = buildClassConstructor()
  clazz.declaration.body.body.push(classConstructor)
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

      const argument = buildClassArgument({fullMethodName, method, path, options})
      const classBodyReturn = buildClassBody({fullMethodName, method, path, options})
      const classMethod = buildClassMethod({fullMethodName, method, path, options})
      classMethod.params.push(argument)
      classMethod.body.body.push(classBodyReturn)
      clazz.declaration.body.body.push(classMethod)
    })
  })

  file.program.body.push(prefixUrl)
  file.program.body.push(clazz)
  contextModule.string.code = generator.default(file).code
  // console.log(contextModule.string.code)
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
