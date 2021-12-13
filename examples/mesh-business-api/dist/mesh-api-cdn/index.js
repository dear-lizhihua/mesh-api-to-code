const prefixUrl = (path) => import.meta.env.VITE_PREFIX + import.meta.env.VITE_VERSION + path
export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async domains(data) {
    const pathname = prefixUrl('/domains')
    return this.httpClient.post(pathname, data)
  }

  async domainsDomainId(data) {
    const pathname = prefixUrl('/domains/:domainId')
    return this.httpClient.put(pathname, data)
  }

  async certs(params) {
    const pathname = prefixUrl('/certs')
    return this.httpClient.get(pathname, { params })
  }

  async certsCertId(params) {
    const pathname = prefixUrl('/certs/:certId')
    return this.httpClient.delete(pathname, { params })
  }
}
