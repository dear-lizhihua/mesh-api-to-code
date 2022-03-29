import t from '@babel/types'

export default ({method, options}) => {
  const objectPattern = t.objectPattern([])
  if (method === 'get' || method === 'delete') {
    objectPattern.properties.push(
      t.objectProperty(
        t.identifier('params'),
        t.identifier('params'),
        false,
        true
      ),
    )
  } else if (method === 'post' || method === 'put') {
    objectPattern.properties.push(
      t.objectProperty(
        t.identifier('data'),
        t.identifier('data'),
        false,
        true
      ),
    )
  }
  if (options.isContentTypeMultipartFormData) {
    objectPattern.properties.push(
      t.objectProperty(
        t.identifier('onUploadProgress'),
        t.assignmentPattern(
          t.identifier('onUploadProgress'),
          t.arrowFunctionExpression([], t.blockStatement([])),
        ),
        false,
        true
      ),
    )
  }
  return objectPattern
}
