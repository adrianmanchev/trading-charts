module.exports = {
  pwa: {
    themeColor: '#FFF'
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].description = 'Example Vue.js website demonstrating how to listen to the Binance Websocket server and trade charts using d3.js.'
        return args
      })
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/trading-charts/'
    : '/'
}