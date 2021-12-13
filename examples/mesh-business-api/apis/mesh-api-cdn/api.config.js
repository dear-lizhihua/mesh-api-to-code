const path = require('path')

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.json'),
      fileName: 'index',
    },
  },
}
