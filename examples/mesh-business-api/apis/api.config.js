const path = require('path')

module.exports = {
  package: {
    publishConfig: {
      registry: 'https://registry.npmmirror.com/'
    },
    directoryNamePrefix: 'mesh-api-2',
    packageNamePrefix: '@mesh-api-2'
  },
  build: {
    lib: {
      // entry: path.resolve(__dirname, 'lib/modules.json'), // 多个模块。生成多个类
      // entry: path.resolve(__dirname, 'lib/module-methods.json'), // 一个模块。生成一个类，包含多个方法
      entry: path.resolve(__dirname, 'lib/index-billing-gcp.json'), // 一个模块。生成一个类，包含多个方法
      fileName: 'index',
    },
  },
}
