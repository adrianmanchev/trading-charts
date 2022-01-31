const BASE_URL = 'wss://stream.binance.com:9443'

const subscribe = (url, callbacks) => {
  const stream = new WebSocket(url)

  for (const event in callbacks) {
    stream.addEventListener(event, callbacks[event])
  }
}

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store
    const arithmetic = app.config.globalProperties.$arithmetic

    const channels = []
    const pairs = store.state.pairs
    for (const key in pairs) {
      channels.push(`${pairs[key]}@ticker`)
    }

    const callbacks = {
      open: () => console.log(new Date(), 'web socket@' + BASE_URL),
      close: reason => console.error(new Date(), 'disconnect', reason),
      error: reason => console.error(new Date(), 'disconnect', reason),
      message: event => {
        const response = JSON.parse(event.data)
        const [pair] = response.stream.split('@')
        const info = store.state.infos[pair] || {}

        const priceScale = info.priceScale || 4

        const change = parseFloat(response.data.P) || 0
        const price = parseFloat(response.data.c) || 0

        store.commit('UPDATE_TICKER', {
          change: arithmetic.fix(change, 2),
          direction: arithmetic.isLt(change, 0) ? 'down' : 'up',
          pair: pair,
          localePrice: arithmetic.format(arithmetic.fix(price, priceScale)),
          price: price,
          time: response.data.E
        })
      }
    }

    subscribe(`${BASE_URL}/stream?streams=${channels.join('/')}`, callbacks)
  }
}
