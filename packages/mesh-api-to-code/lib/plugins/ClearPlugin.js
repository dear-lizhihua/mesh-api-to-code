import fs from 'fs-extra'

export default class ClearPlugin {
  apply(context) {
    context.hook.clear.tapPromise('ClearPlugin', async (context) => {
      // 清理 dist 目录
      await fs.emptyDir(context.paths.distDirectoryFullPath)
    })
  }
}
