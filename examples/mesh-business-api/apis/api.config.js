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
      entry: path.resolve(__dirname, 'lib/index-billing-gcp.json'),
      // entry: path.resolve(__dirname, 'lib/index-cdn.json'),
      // entry: path.resolve(__dirname, 'lib/index-public.json'),
      fileName: 'index',
    },
  },
}
