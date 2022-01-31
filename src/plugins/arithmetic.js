const Big = require('big.js')

const fillRightZero = n => new Array(n + 1).join('0')

const fixRound = function (value, decimals) {
  value = parseFloat(value) || 0
  decimals = parseFloat(decimals) || 0
  return Big(value).round(decimals, 0).toFixed()
}

const fractionCount = function (value) {
  return ((value + '').split('.')[1] || '').length
}

const getRandomPortion = (num, times) => {
  const response = []
  if (times <= 1) {
    response.push(fixRound(num, 2))
    return response
  }

  const current = fixRound(Math.random() * (num / 2), 2)
  response.push(current)
  return response.concat(getRandomPortion(num - current, --times))
}

const arithmetic = {
  fractionCount: fractionCount,
  getRandomNumber: (min, max) => Math.random() * (max - min) + min,
  getRandomPortion: getRandomPortion,
  format: function (value, options) {
    options = options || {}
    const period = options.period || '.'
    const thousandSeparator = options.thousand || ','
    const decimalSeparator = options.decimal || '.'
    value = value || ''
    value = value.toString().split(period)
    return value[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) + (value[1] ? decimalSeparator + value[1] : '')
  },
  fix: function (value, decimals) {
    const n = fixRound(value, decimals)
    const dot = n.indexOf('.')
    if ((dot === -1) && decimals) {
      return n + '.' + fillRightZero(decimals)
    }

    const v = n.toString()
    const diff = decimals - fractionCount(v)
    return diff > 0 ? (n + '' + fillRightZero(diff)) : v
  },
  abs: x => Big(x).abs(),
  exponent: x => Big(x).e,
  times: (x, y) => Big(x).times(Big(y)),
  div: (x, y) => Big(x).div(Big(y)),
  plus: (x, y) => Big(x).plus(Big(y)),
  minus: (x, y) => Big(x).minus(Big(y)),
  isEq: (x, y) => Big(x).eq(Big(y)),
  isGt: (x, y) => Big(x).gt(Big(y)),
  isGte: (x, y) => Big(x).gte(Big(y)),
  isLt: (x, y) => Big(x).lt(Big(y)),
  isLte: (x, y) => Big(x).lte(Big(y))
}

export default {
  install: (app, options) => {
    app.config.globalProperties.$arithmetic = arithmetic
  }
}
