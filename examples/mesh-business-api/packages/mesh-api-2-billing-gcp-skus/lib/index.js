const prefixUrl = (path) => import.meta.env.VITE_PREFIX + '/' + import.meta.env.VITE_VERSION + path
export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async getSkusDiscount(params) {
    const pathname = prefixUrl('/skus/discount')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: 'json',
    })
  }
}
