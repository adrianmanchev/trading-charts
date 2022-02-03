module.exports = {
  pwa: {
    themeColor: '#FFF'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/trading-charts/'
    : '/'
}