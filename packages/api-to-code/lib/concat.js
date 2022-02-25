const concatPrefixUrl = () => `const prefixUrl = path => import.meta.env.VITE_PREFIX + '/' + import.meta.env.VITE_VERSION + path`
const concatWrapperClassName = (constructor, methods) => `
export class ApiService {
  ${constructor}
  ${methods}
}
`
const concatConstructor = () => `
  constructor (httpClient) {
    this.httpClient = httpClient
  }
`

const concatGetFunction = (functionName, pathname, options) => {
  const responseType = options.isContentDispositionAttachment ? 'blob' : 'json'
  const concatContentTypeMultipartFormData = () => options.isContentTypeMultipartFormData ? `, {onUploadProgress = () => {}}` : ''
  const concatContentTypeMultipartFormData2 = () => options.isContentTypeMultipartFormData ? ` headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress,` : ''

  return `
  async ${functionName} (params ${concatContentTypeMultipartFormData()}) {
    const pathname = prefixUrl('${pathname}')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: '${responseType}',
      ${concatContentTypeMultipartFormData2()}
    })
  }
`
}
const concatDeleteFunction = (functionName, pathname) => `
  async ${functionName} (params) {
    const pathname = prefixUrl('${pathname}')
    return this.httpClient.delete(pathname, {params})
  }
`
const concatPostFunction = (functionName, pathname, options) => {
  const responseType = options.isContentDispositionAttachment ? 'blob' : 'json'
  const concatContentTypeMultipartFormData = () => options.isContentTypeMultipartFormData ? `, {onUploadProgress = () => {}}` : ''
  const concatContentTypeMultipartFormData2 = () => options.isContentTypeMultipartFormData ? ` headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress,` : ''

  return `
  async ${functionName} (data ${concatContentTypeMultipartFormData()}) {
    const pathname = prefixUrl('${pathname}')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: '${responseType}',
      ${concatContentTypeMultipartFormData2()}
    })
  }
`
}
const concatPutFunction = (functionName, pathname) => `
  async ${functionName} (data) {
    const pathname = prefixUrl('${pathname}')
    return this.httpClient.put(pathname, data)
  }
`
const concatFunctionMap = {
  get: concatGetFunction, delete: concatDeleteFunction, post: concatPostFunction, put: concatPutFunction,
}

module.exports.concatPrefixUrl = concatPrefixUrl
module.exports.concatWrapperClassName = concatWrapperClassName
module.exports.concatConstructor = concatConstructor
module.exports.concatFunctionMap = concatFunctionMap
