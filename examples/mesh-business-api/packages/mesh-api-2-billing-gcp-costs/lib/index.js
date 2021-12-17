const prefixUrl = (path) => import.meta.env.VITE_PREFIX + '/' + import.meta.env.VITE_VERSION + path
export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async getCostsCurrentMonthTotal(params) {
    const pathname = prefixUrl('/costs/current_month/total')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: 'json',
    })
  }

  async getCostsCostTrendGroupBy(params) {
    const pathname = prefixUrl('/costs/cost_trend/group_by')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: 'json',
    })
  }

  async postCostsComparePeriodTotal(data) {
    const pathname = prefixUrl('/costs/compare_period/total')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  async postCostsDayOnDayRatioGroupBy(data) {
    const pathname = prefixUrl('/costs/day_on_day_ratio/group_by')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  async postCosts(data) {
    const pathname = prefixUrl('/costs')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  async getCostsExport(params) {
    const pathname = prefixUrl('/costs/export')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: 'blob',
    })
  }

  async postCostsServicesOptions(data) {
    const pathname = prefixUrl('/costs/services/options')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  async postCostsSkusOptions(data) {
    const pathname = prefixUrl('/costs/skus/options')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }
}
