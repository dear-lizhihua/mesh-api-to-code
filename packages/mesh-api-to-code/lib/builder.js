import {SyncHook, AsyncSeriesHook} from 'tapable'
import plugins from './plugins/index.js'

(async () => {
  const context = Object.create(null)
  Object.defineProperty(context, 'hook', {
    enumerable: false,
    value: {
      extend: new SyncHook(['context']),
      createContextRoot: new SyncHook(['context']),
      config: new AsyncSeriesHook(['context']),
      clear: new AsyncSeriesHook(['context']),
      groupByPath: new SyncHook(['context']),
      mapModule: new SyncHook(['context']),
    }
  })
  for (let i = 0; i < plugins.length; i++) {
    const Plugin = plugins[i]
    new Plugin().apply(context)
  }
  context.hook.extend.call(context)
  context.hook.createContextRoot.call(context)
  await context.hook.config.promise(context)
  await context.hook.clear.promise(context)
  await context.hook.groupByPath.call(context)
  await context.hook.mapModule.call(context)
})()
