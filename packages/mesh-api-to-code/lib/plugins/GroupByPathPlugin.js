import lodash from 'lodash'
const { groupBy } = lodash

export default class GroupByPathPlugin {
  apply(context) {
    context.hook.extend.tap('GroupByPathPlugin', async (context) => {
      context.moduleMap = null
    })
    context.hook.groupByPath.tap('GroupByPathPlugin', async (context) => {
      context.moduleMap = groupBy(Object.keys(context.data.paths), (path) => /^\/([^\/]+)/g.exec(path)[1])
    })
  }
}
