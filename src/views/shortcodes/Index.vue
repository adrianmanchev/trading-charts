<template>
  <main class="container my-4">
    <h2 class="display-6 mb-4">Shortcodes</h2>
    <div class="row gy-3">
      <div class="col-12">
        <h3 class="fs-4 fw-normal">D3</h3>
        <p class="col-lg-6">Create a line chart with historical close prices for the time series and change the tick price.</p>
        <div class="col-lg-6 bg-light shadow-sm rounded">
          <div class="p-3">
            <code>
              <pre>{{ `import chart from '@/helpers/chart'` }}</pre>
              <pre>{{ `const draw = chart(data, {\n\tcolor: '#0d6efd',\n\twidth: 960\n})` }}</pre>
              <pre class="mb-0">{{ `draw.update(price)` }}</pre>
            </code>
          </div>
        </div>
      </div>
      <div class="col-12">
        <hr class="col-lg-6 bg-secondary mb-1" />
      </div>
      <div class="col-12">
        <h3 class="fs-4 fw-normal">Binance</h3>
        <p class="col-lg-6">Request historical klines data for a certain symbol over a specified time period. For drawing line charts inside payload data, use time and close price.</p>
        <div class="col-lg-6 bg-light shadow-sm rounded">
          <div class="p-3">
            <code>
              <pre>{{ `import axios from 'axios'` }}</pre>
              <pre>{{ `const instance = axios.create({\n\tbaseURL: 'https://api.binance.com',\n\theaders: {\n\t\tAccept: 'application/json',\n\t\t'Content-Type': 'application/json'\n\t}\n})` }}
              </pre>
              <pre class="mb-0">{{ `const klines = instance({\n\tmethod: 'get',\n\turl: '/api/v3/klines',\n\tparams: {\n\t\tsymbol: 'BTCUSDT',\n\t\tinterval: '15m'\n\t}\n})` }}</pre>
            </code>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
