import fs from 'fs-extra'
import MagicString from 'magic-string'
import {readFile, parseJSON} from './index.js'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))

export default async (contextModule) => {
  await writeTemplateEnv(contextModule)
  await writeTemplateNpmIgnore(contextModule)
  await writeTemplatePackageJson(contextModule)
  await writeTemplateViteConfig(contextModule)
}

const writeTemplateEnv = async (contextModule) => {
  const sourceFileEnvFullPath = resolve(__dirname, './template/.env')
  const sourceFileEnv = await readFile(sourceFileEnvFullPath, 'utf8')

  // 替换模板文本
  const sourceFileEnvString = new MagicString(sourceFileEnv)
  const patternPrefix = /(VITE_PREFIX=)+/g
  let matchPrefix
  while ((matchPrefix = patternPrefix.exec(sourceFileEnv))) {
    const start = matchPrefix.index
    const end = start + matchPrefix[1].length
    sourceFileEnvString.overwrite(start, end, `VITE_PREFIX=${contextModule.result.prefix}`)
  }
  const patternVersion = /(VITE_VERSION=)+/g
  let matchVersion
  while ((matchVersion = patternVersion.exec(sourceFileEnv))) {
    const start = matchVersion.index
    const end = start + matchVersion[1].length
    sourceFileEnvString.overwrite(start, end, `VITE_VERSION=${contextModule.result.version}`)
  }
  const patternModule = /(VITE_MODULE=)+/g
  let matchModule
  while ((matchModule = patternModule.exec(sourceFileEnv))) {
    const start = matchModule.index
    const end = start + matchModule[1].length
    sourceFileEnvString.overwrite(start, end, `VITE_MODULE=${contextModule.moduleName}`)
  }

  // 写入文件
  const distFileEnvFullPath = `${contextModule.paths.distModuleDirectoryFullPath}/.env`
  await fs.ensureFile(distFileEnvFullPath)
  await fs.outputFile(distFileEnvFullPath, sourceFileEnvString.toString())
}

const writeTemplateNpmIgnore = async (contextModule) => {
  const sourceFileNpmIgnoreFullPath = resolve(__dirname, './template/.npmignore')
  const distFileNpmIgnoreFullPath = `${contextModule.paths.distModuleDirectoryFullPath}/.npmignore`
  await fs.copy(sourceFileNpmIgnoreFullPath, distFileNpmIgnoreFullPath)
}

const writeTemplatePackageJson = async (contextModule) => {
  const sourceFilePackageJsonFullPath = resolve(__dirname, './template/package.json')
  const sourceFilePackageJson = parseJSON(await readFile(sourceFilePackageJsonFullPath))
  const packageNamePrefix = contextModule.package.packageNamePrefix || '@mesh-api'

  // 替换模板文本
  sourceFilePackageJson.name = `${packageNamePrefix}/${contextModule.serviceName}-${contextModule.moduleName}`
  if (contextModule.package.publishConfig.registry) {
    sourceFilePackageJson.publishConfig = Object.create(null)
    sourceFilePackageJson.publishConfig.registry = contextModule.package.publishConfig.registry
  }

  // 写入文件
  const distFilePackageJsonFullPath = `${contextModule.paths.distModuleDirectoryFullPath}/package.json`
  await fs.ensureFile(distFilePackageJsonFullPath)
  await fs.outputFile(distFilePackageJsonFullPath, JSON.stringify(sourceFilePackageJson, null, 2) + '\n')
}

const writeTemplateViteConfig = async (contextModule) => {
  const sourceFileViteConfigFullPath = resolve(__dirname, './template/vite.config.js')
  const distFileViteConfigFullPath = `${contextModule.paths.distModuleDirectoryFullPath}/vite.config.js`
  await fs.copy(sourceFileViteConfigFullPath, distFileViteConfigFullPath)
}
