import t from '@babel/types'

export default ({fullMethodName, path}) => {
  const classMethod = t.classMethod(
    'method',
    t.identifier(fullMethodName),
    [],
    t.blockStatement([
      t.variableDeclaration(
        'const',
        [
          t.variableDeclarator(
            t.identifier('pathname'),
            t.callExpression(t.identifier('prefixUrl'), [t.stringLiteral(path)])
          )
        ]
      ),
    ]),
  )
  return classMethod
}
