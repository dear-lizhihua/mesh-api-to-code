const {camelCase} = require('lodash')

const {
  concatPrefixUrl,
  concatWrapperClassName,
  concatConstructor,
  concatFunctionMap,
} = require('./concat')

module.exports = (context) => {
  context.string.concatPrefixUrl = concatPrefixUrl()
  context.string.constructor = concatConstructor()
  mapPaths(context.data.paths, ({path, methodName, methodDefinitions}) => {
    mapMethods(methodDefinitions, ({method, methodDefinition}) => {
      context.string.methods += concatFunctionMap[method](methodName, path)
    })
  })
  context.string.code = context.string.concatPrefixUrl + concatWrapperClassName(
    context.string.constructor,
    context.string.methods,
  )
}
const mapPaths = (paths, callback) => {
  for (const path of Object.keys(paths)) {
    const methodDefinitions = paths[path]
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
