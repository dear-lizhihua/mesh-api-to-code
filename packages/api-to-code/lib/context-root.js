module.exports.createContextRoot = (
  {
    cwd,
    sourceDirectoryFullPath,
    sourceConfigFullPath,
    distDirectoryFullPath,
  },
) => {
  const context = Object.create(null)

  context.paths = {
    cwd,
    sourceDirectoryFullPath,
    sourceConfigFullPath,
    distDirectoryFullPath,
  }
  context.config = require(sourceConfigFullPath) // 取出配置
  context.package = context.config.package || Object.create(null) // 取出 OpenAPI JSON 数据
  context.data = require(context.config.build.lib.entry) // 取出 OpenAPI JSON 数据

  // 计算前缀和版本号
  const match = /(.*)\/(v\d+)$/.exec(context.data.basePath)
  context.res = Object.create(null)
  context.res.prefix = match[1]
  context.res.version = match[2]

  return context
}
