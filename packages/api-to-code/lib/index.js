#!/usr/bin/env node
'use strict'

const cwd = process.cwd()
const fs = require('fs-extra')

const {createContextRoot} = require('./context-root')
const {createContextModule} = require('./context-module')
const {clearDistDirectory} = require('./clear')
const groupByApi = require('./group-by-api')
const translateApi = require('./translate-api')
const prettierCode = require('./prettier-code')
const writeCode = require('./write-code')
const writeTemplate = require('./write-template')

;(async () => {
  const sourceDirectoryFullPath = `${cwd}/apis`
  const sourceConfigFullPath = `${sourceDirectoryFullPath}/api.config.js`
  const distDirectoryFullPath = `${cwd}/packages`
  await clearDistDirectory(distDirectoryFullPath)

  const context = createContextRoot({
    cwd,
    sourceDirectoryFullPath,
    sourceConfigFullPath,
    distDirectoryFullPath,
  })
  groupByApi(context)
  const mapModules = async (context, callback) => {
    for (const moduleName in context.moduleMap) {
      const moduleValues = context.moduleMap[moduleName]
      await callback(moduleName, moduleValues)
    }
  }
  await mapModules(context, async (moduleName, moduleValues) => {
    const contextModule = createContextModule(context, {moduleName, moduleValues})
    await fs.ensureDir(contextModule.paths.distModuleDirectoryFullPath)
    translateApi(contextModule)
    await prettierCode(contextModule)
    await writeCode(contextModule)
    await writeTemplate(contextModule)
  })
})()
