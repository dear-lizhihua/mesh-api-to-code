const fs = require('fs-extra')
module.exports.clearDistDirectory = async (distDirectoryFullPath) => {
  // 清理 dist 目录
  await fs.emptyDir(distDirectoryFullPath)
}
