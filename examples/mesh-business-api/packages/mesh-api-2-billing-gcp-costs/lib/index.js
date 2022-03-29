const prefixUrl = (path) => import.meta.env.VITE_PREFIX + '/' + import.meta.env.VITE_VERSION + path

export class ApiService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  getCostsCurrentMonthTotal({ params }) {
    const pathname = prefixUrl('/costs/current_month/total')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: 'json',
    })
  }

  getCostsCostTrendGroupBy({ params }) {
    const pathname = prefixUrl('/costs/cost_trend/group_by')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: 'json',
    })
  }

  postCostsComparePeriodTotal({ data }) {
    const pathname = prefixUrl('/costs/compare_period/total')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  postCostsDayOnDayRatioGroupBy({ data }) {
    const pathname = prefixUrl('/costs/day_on_day_ratio/group_by')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  postCosts({ data }) {
    const pathname = prefixUrl('/costs')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  getCostsExport({ params }) {
    const pathname = prefixUrl('/costs/export')
    return this.httpClient({
      method: 'get',
      url: pathname,
      params,
      responseType: 'blob',
    })
  }

  postCostsServicesOptions({ data }) {
    const pathname = prefixUrl('/costs/services/options')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }

  postCostsSkusOptions({ data }) {
    const pathname = prefixUrl('/costs/skus/options')
    return this.httpClient({
      method: 'post',
      url: pathname,
      data,
      responseType: 'json',
    })
  }
}
