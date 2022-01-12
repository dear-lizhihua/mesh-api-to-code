const prefixUrl = (path) => import.meta.env.VITE_PREFIX + '/' + import.meta.env.VITE_VERSION + path
export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async deleteBudgetsById(params) {
    const pathname = prefixUrl('/budgets/:id')
    return this.httpClient.delete(pathname, { params })
  }
}
