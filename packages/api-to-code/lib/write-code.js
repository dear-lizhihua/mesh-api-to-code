const fs = require('fs-extra')

module.exports = async (contextModule) => {
  await fs.outputFile(contextModule.paths.distPackageLibFileFullPath, contextModule.string.formatCode)
}
