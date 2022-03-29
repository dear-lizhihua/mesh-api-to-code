import fs from 'fs-extra'

import codeBuilder from '../utils/code-builder.js'
import codePrettier from '../utils/code-prettier.js'
import codeWriter from '../utils/code-writer.js'
import templateWriter from '../utils/template-writer.js'

export default class MapModulePlugin {
  apply(context) {
    context.hook.mapModule.tap('MapModulePlugin', async (context) => {
      const mapModules = async (context, callback) => {
        for (const moduleName in context.moduleMap) {
          const moduleValues = context.moduleMap[moduleName]
          await callback(moduleName, moduleValues)
        }
      }
      await mapModules(context, async (moduleName, moduleValues) => {
        const contextModule = createContextModule(context, {moduleName, moduleValues})
        await fs.ensureDir(contextModule.paths.distModuleDirectoryFullPath)
        codeBuilder(contextModule)
        codePrettier(contextModule)
        await codeWriter(contextModule)
        await templateWriter(contextModule)
      })
    })
  }
}

const createContextModule = (context, {moduleName, moduleValues}) => {
  const contextModule = Object.create(context)
  contextModule.moduleName = moduleName
  contextModule.moduleValues = moduleValues

  // package
  context.package = context.package || Object.create(null)
  context.package.publishConfig = context.package.publishConfig || Object.create(null)

  // service 名称和 package 名称
  contextModule.serviceName = contextModule.result.prefix.replace(/^\//, '').replace(/\//, '-')
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
  context.string.formatCode = ''

  return contextModule
}
