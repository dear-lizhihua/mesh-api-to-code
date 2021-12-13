module.exports.createContext = async ({cwd, apiDirectory, apiConfig}) => {
  const data = require(apiConfig)
  const context = Object.create(null)
  context.paths = {cwd, apiDirectory, apiConfig}
  context.config = data

  // 取出 OpenAPI JSON 数据
  context.data = require(context.config.build.lib.entry)

  // 计算前缀和版本号
  const match = /(.*)\/(v\d+)$/.exec(context.data.basePath)
  context.res = Object.create(null)
  context.res.prefix = match[1]
  context.res.version = match[2]

  // 准备拼接字符串
  context.string = Object.create(null)
  context.string.code = ''
  context.string.constructor = ''
  context.string.methods = ''

  return context
}
