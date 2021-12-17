module.exports.createContextModule = (context, {moduleName, moduleValues}) => {
//  const configData = require(sourcePackageConfigFullPath)
  const contextModule = Object.create(context)
  contextModule.moduleName = moduleName
  contextModule.moduleValues = moduleValues

  // package
  context.package = context.package || Object.create(null)
  context.package.publishConfig = context.package.publishConfig || Object.create(null)

  // service 名称和 package 名称
  contextModule.serviceName = contextModule.res.prefix.replace(/^\//, '').replace(/\//, '-')
  const directoryNamePrefix = context.package.directoryNamePrefix || 'mesh-api'
  contextModule.paths.prefixedModuleKey = `${directoryNamePrefix}-${contextModule.serviceName}-${contextModule.moduleName}`

  // package 路径
  contextModule.paths.distModuleDirectoryFullPath = `${context.paths.distDirectoryFullPath}/${contextModule.paths.prefixedModuleKey}`

  // 准备格式化字符串
  const fileName = contextModule.config.build.lib.fileName || 'index'
  contextModule.paths.distPackageLibFileFullPath = `${contextModule.paths.distModuleDirectoryFullPath}/lib/${fileName}.js`

  // 准备拼接字符串
  context.string = Object.create(null)
  context.string.code = ''
  context.string.constructor = ''
  context.string.methods = ''
  context.string.formatCode = ''

  return contextModule
}
