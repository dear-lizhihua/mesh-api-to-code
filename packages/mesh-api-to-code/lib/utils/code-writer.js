import fs from 'fs-extra'

export default async (contextModule) => {
  await fs.ensureFile(contextModule.paths.distPackageLibFileFullPath)
  await fs.outputFile(contextModule.paths.distPackageLibFileFullPath, contextModule.string.formatCode)
}
