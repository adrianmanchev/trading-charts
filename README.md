[![SonarCloud analysis](https://github.com/adrianmanchev/trading-charts/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/adrianmanchev/trading-charts/actions/workflows/sonarcloud.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=adrianmanchev_trading-charts&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=adrianmanchev_trading-charts) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=adrianmanchev_trading-charts&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=adrianmanchev_trading-charts) ![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fadrianmanchev.github.io%2Ftrading-charts%2F)

# trading-charts

Example Vue.js website demonstrating how to listen to the Binance Websocket server and trade charts using d3.js.

![Bitcoin to Tether chart](https://raw.githubusercontent.com/adrianmanchev/adrianmanchev.github.io/main/static/preview-trading-charts.png)

## Demo

⚡️ [https://adrianmanchev.github.io/trading-charts](https://adrianmanchev.github.io/trading-charts)

## Shortcodes

### D3

Create a line chart with historical close prices for the time series and change the tick price.

```
import chart from '@/helpers/chart'

const draw = chart(data, {
  width: 960
})

draw.update(price)
```

### Binance

Request historical klines data for a certain symbol over a specified time period. For drawing line charts inside payload data, use time and close price.

```
import axios from 'axios'

const instance = axios.create(
  baseURL: 'https://api.binance.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const klines = instance({
  method: 'get',
  url: '/api/v3/klines',
  params: {
    symbol: 'BTCUSDT',
    interval: '15m'
  }
})
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```