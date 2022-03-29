import t from '@babel/types'

export default () => {
  const classMethod = t.classMethod(
    'constructor',
    t.identifier('constructor'),
    [t.identifier('httpClient')],
    t.blockStatement([
      t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(
            t.thisExpression(),
            t.identifier('httpClient'),
          ),
          t.identifier('httpClient'),
        ),
      )
    ])
  )
  return classMethod
}
