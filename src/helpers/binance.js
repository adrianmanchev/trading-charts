import axios from 'axios'

const serializer = (params) => {
  const response = []
  const keys = Object.keys(params)
  const total = keys.length
  for (let j = 0; j < total; j++) {
    const key = keys[j]
    response.push(`${key}=${encodeURIComponent('["' + params[key].map(value => value.toUpperCase()).join('","') + '"]')}`)
  }

  return `${response.join('&')}`
}

const instance = axios.create({
  baseURL: 'https://api.binance.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(response => ({
  status: response.status,
  statusText: response.statusText,
  data: response.data
}))

export default {
  exchangeInfo: (symbols) => instance({
    method: 'get',
    url: '/api/v3/exchangeInfo',
    params: {
      symbols: symbols
    },
    paramsSerializer: serializer
  }),
  klines: (symbol, interval) => instance({
    method: 'get',
    url: '/api/v3/klines',
    params: {
      symbol: symbol,
      interval: interval
    }
  })
}
