import t from '@babel/types'

export default () => {
  const variableDeclaration = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('prefixUrl'),
      t.arrowFunctionExpression(
        [t.identifier('path')],
        t.binaryExpression(
          '+',
          t.binaryExpression(
            '+',
            t.binaryExpression(
              '+',
              t.memberExpression(
                t.memberExpression(
                  t.metaProperty(
                    t.identifier('import'),
                    t.identifier('meta'),
                  ),
                  t.identifier('env')
                ),
                t.identifier('VITE_PREFIX')
              ),
              t.stringLiteral('/')
            ),
            t.memberExpression(
              t.memberExpression(
                t.metaProperty(
                  t.identifier('import'),
                  t.identifier('meta'),
                ),
                t.identifier('env')
              ),
              t.identifier('VITE_VERSION')
            ),
          ),
          t.identifier('path')
        )
      ),
    ),
  ])

  return variableDeclaration
}
