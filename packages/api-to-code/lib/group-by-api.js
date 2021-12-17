const {groupBy} = require('lodash')

module.exports = (context) => {
  const moduleMap = groupBy(Object.keys(context.data.paths), (path) => /^\/([^\/]+)/g.exec(path)[1])
  context.moduleMap = moduleMap
}
