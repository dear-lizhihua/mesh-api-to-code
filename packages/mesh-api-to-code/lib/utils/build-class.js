import t from '@babel/types'

export default () => {
  const exportNamedClassDeclaration = t.exportNamedDeclaration(t.classDeclaration(
    t.identifier('ApiService'),
    null,
    t.classBody(
      []
    ),
    []
  ))

  return exportNamedClassDeclaration
}
