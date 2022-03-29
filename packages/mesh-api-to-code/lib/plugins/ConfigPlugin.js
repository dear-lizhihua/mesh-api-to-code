// import fs from 'fs-extra'
import {readFile, parseJSON} from '../utils/index.js'

export default class ConfigPlugin {
  apply(context) {
    context.hook.extend.tap('ConfigPlugin', (context) => {
      context.config = Object.create(null)
      context.data = Object.create(null)
      context.package = Object.create(null)
    })
    context.hook.config.tapPromise('ConfigPlugin', async (context) => {
      context.config = (await import(context.paths.sourceConfigFullPath)).default // 取出配置
      context.data = parseJSON(await readFile(context.config.build.lib.entry)) // 取出 OpenAPI JSON 数据
      context.package = context.config.package || Object.create(null) // 取出 OpenAPI JSON 数据

      // 计算前缀和版本号
      const match = /(.*)\/(v\d+)$/.exec(context.data.basePath)
      context.result = Object.create(null)
      context.result.prefix = match[1]
      context.result.version = match[2]
    })
  }
}
