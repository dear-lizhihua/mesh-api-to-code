export default class ContextRootPlugin {
  apply(context) {
    // console.log('ContextRootPlugin')
    context.hook.extend.tap('ContextRootPlugin', (context) => {
      context.paths = Object.create(null)
      context.paths.cwd = process.cwd()
      context.paths.sourceDirectoryFullPath = ''
      context.paths.sourceConfigFullPath = ''
      context.paths.distDirectoryFullPath = ''
    })
    context.hook.createContextRoot.tap('ContextRootPlugin', (context) => {
      context.paths.sourceDirectoryFullPath = `${context.paths.cwd}/apis`
      context.paths.sourceConfigFullPath = `${context.paths.sourceDirectoryFullPath}/api.config.js`
      context.paths.distDirectoryFullPath = `${context.paths.cwd}/packages`
    })
  }
}
