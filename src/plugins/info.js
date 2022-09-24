import binance from '@/helpers/binance'

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store
    const arithmetic = app.config.globalProperties.$arithmetic

    binance.exchangeInfo(store.state.pairs).then(response => {
      const items = response.data.symbols
      const total = items.length

      for (let j = 0; j < total; j++) {
        const item = items[j]
        const meta = store.state.metas[item.baseAsset] || {}
        const unit = store.state.units[item.quoteAsset] || {}
        const PRICE_DECIMAL = (item.filters.filter(x => x.filterType === 'PRICE_FILTER')[0] || {}).tickSize || 0.0001
        const LOT_DECIMAL = (item.filters.filter(x => x.filterType === 'LOT_SIZE')[0] || {}).minQty || 0.0001

        store.commit('UPDATE_INFO', {
          symbol: item.baseAsset,
          logo: meta.logo,
          name: meta.name,
          slug: meta.slug,
          quote: item.quoteAsset,
          quoteLabel: unit.label,
          quoteLogo: unit.logo,
          pair: item.symbol.toLowerCase(),
          status: item.status,
          lotScale: arithmetic.abs(arithmetic.exponent(LOT_DECIMAL)).toNumber() + 1,
          priceScale: arithmetic.abs(arithmetic.exponent(PRICE_DECIMAL)).toNumber()
        })
      }
    }).catch(console.log)
  }
}
