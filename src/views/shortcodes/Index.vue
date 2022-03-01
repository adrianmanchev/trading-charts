<template>
  <main class="container my-4">
    <h2 class="display-6 mb-4">{{ $t('shortcodes') }}</h2>
    <div class="row gy-3">
      <div class="col-12">
        <h3 class="fs-4 fw-normal">D3.js</h3>
        <p class="col-lg-6">{{ $t('chart') }}</p>
        <div class="col-lg-6 bg-light shadow-sm rounded">
          <div class="p-3">
            <code>
              <pre>{{ `import chart from '@/helpers/chart'` }}</pre>
              <pre>{{ `const draw = chart(data, {\n\twidth: 960\n})` }}</pre>
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
        <p class="col-lg-6">{{ $t('binance') }}</p>
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

<i18n>
{
  "bg": {
    "binance": "Изисквайте исторически данни за клинове за определен символ за определен период от време. За начертаване на линейни диаграми в данните за полезен товар използвайте време и цена на затваряне.",
    "chart": "Създайте линейна диаграма с исторически цени на затваряне за времевите серии и променете цената на тик."
  },
  "en": {
    "binance": "Request historical klines data for a certain symbol over a specified time period. For drawing line charts inside payload data, use time and close price.",
    "chart": "Create a line chart with historical close prices for the time series and change the tick price."
  },
  "tr": {
    "binance": "Belirli bir süre boyunca belirli bir sembol için geçmiş kline verilerini isteyin. Yük verileri içinde çizgi grafikleri çizmek için zaman ve kapanış fiyatını kullanın.",
    "chart": "Fiyat grafiği için kapanış fiyatlarıyla bir çizgi grafik oluşturun ve son işlem fiyatını güncelleyin."
  }
}
}
</i18n>
