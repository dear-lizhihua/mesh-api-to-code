import t from '@babel/types'

export default ({method, options}) => {
  const objectExpression = t.objectExpression([
    t.objectProperty(
      t.identifier('method'),
      t.stringLiteral(method),
      false,
      true
    ),
    t.objectProperty(
      t.identifier('url'),
      t.identifier('pathname'),
      false,
      true
    ),
  ])
  if (method === 'get' || method === 'delete') {
    objectExpression.properties.push(
      t.objectProperty(
        t.identifier('params'),
        t.identifier('params'),
        false,
        true
      ),
    )
  } else if (method === 'post' || method === 'put') {
    objectExpression.properties.push(
      t.objectProperty(
        t.identifier('data'),
        t.identifier('data'),
        false,
        true
      ),
    )
  }
  if (options.isContentTypeMultipartFormData) {
    objectExpression.properties.push(
      t.objectProperty(
        t.identifier('headers'),
        t.objectExpression([
          t.objectProperty(
            t.stringLiteral('Content-Type'),
            t.stringLiteral('multipart/form-data'),
            false,
            true
          ),
        ]),
        false,
        true
      ),
      t.objectProperty(
        t.identifier('onUploadProgress'),
        t.identifier('onUploadProgress'),
        false,
        true
      ),
    )
  }

  let responseType = 'json'
  if (options.isContentDispositionAttachment) {
    responseType = 'blob'
  }
  objectExpression.properties.push(
    t.objectProperty(
      t.identifier('responseType'),
      t.stringLiteral(responseType),
      false,
      true
    ),
  )

  const objectPattern = t.callExpression(
    t.memberExpression(
      t.thisExpression(),
      t.identifier('httpClient'),
    ),
    []
  )
  objectPattern.arguments.push(objectExpression)
  return t.returnStatement(objectPattern)
}
