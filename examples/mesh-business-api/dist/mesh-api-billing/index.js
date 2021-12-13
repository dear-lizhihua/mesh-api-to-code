const prefixUrl = (path) => import.meta.env.VITE_PREFIX + import.meta.env.VITE_VERSION + path
export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async costsCurrentMonthTotal(params) {
    const pathname = prefixUrl('/costs/current_month/total')
    return this.httpClient.get(pathname, { params })
  }

  async costsCostTrendGroupBy(params) {
    const pathname = prefixUrl('/costs/cost_trend/group_by')
    return this.httpClient.get(pathname, { params })
  }

  async costsComparePeriodTotal(data) {
    const pathname = prefixUrl('/costs/compare_period/total')
    return this.httpClient.post(pathname, data)
  }

  async costsDayOnDayRatioGroupBy(data) {
    const pathname = prefixUrl('/costs/day_on_day_ratio/group_by')
    return this.httpClient.post(pathname, data)
  }

  async costs(data) {
    const pathname = prefixUrl('/costs')
    return this.httpClient.post(pathname, data)
  }

  async costsExport(params) {
    const pathname = prefixUrl('/costs/export')
    return this.httpClient.get(pathname, { params })
  }

  async costsServicesOptions(data) {
    const pathname = prefixUrl('/costs/services/options')
    return this.httpClient.post(pathname, data)
  }

  async costsSkusOptions(data) {
    const pathname = prefixUrl('/costs/skus/options')
    return this.httpClient.post(pathname, data)
  }

  async skusDiscount(params) {
    const pathname = prefixUrl('/skus/discount')
    return this.httpClient.get(pathname, { params })
  }
}
