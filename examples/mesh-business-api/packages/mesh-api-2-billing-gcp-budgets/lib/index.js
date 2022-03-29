const prefixUrl = (path) => import.meta.env.VITE_PREFIX + '/' + import.meta.env.VITE_VERSION + path

export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  deleteBudgetsById({ params }) {
    const pathname = prefixUrl('/budgets/:id')
    return this.httpClient({
      method: 'delete',
      url: pathname,
      params,
      responseType: 'json',
    })
  }
}
