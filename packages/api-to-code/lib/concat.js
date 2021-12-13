const concatPrefixUrl = () => `const prefixUrl = path => import.meta.env.VITE_PREFIX + import.meta.env.VITE_VERSION + path`
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

const concatGetFunction = (functionName, pathname) => `
  async ${functionName} (params) {
    const pathname = prefixUrl('${pathname}')
    return this.httpClient.get(pathname, {params})
  }
`
const concatDeleteFunction = (functionName, pathname) => `
  async ${functionName} (params) {
    const pathname = prefixUrl('${pathname}')
    return this.httpClient.delete(pathname, {params})
  }
`
const concatPostFunction = (functionName, pathname) => `
  async ${functionName} (data) {
    const pathname = prefixUrl('${pathname}')
    return this.httpClient.post(pathname, data)
  }
`
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
