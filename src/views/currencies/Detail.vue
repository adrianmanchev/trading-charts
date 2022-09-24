<template>
  <div class="d-header d-flex gap-4 align-items-center mb-4">
    <img v-bind:src="currency.logo" v-bind:alt="currency.name" width="48" height="48" class="rounded-circle" />
    <div class="d-title">
      <h2 class="display-6 fw-light mb-0">{{ info.symbol }}</h2>
      <h3 class="fw-normal text-muted fs-6 mb-0 lh-sm">{{ $t('currencyprice', { name: currency.name }) }}</h3>
    </div>
    <div v-if="ticker.price" class="d-ticker ms-auto">
      <div class="display-6 fw-light">{{ ticker.localePrice }} {{ info.quote }}</div>
      <div v-bind:class="'fw-normal fs-6 lh-sm text-end color-' + ticker.direction"><arrow v-bind:direction="ticker.direction" /> {{ ticker.change }}%</div>
    </div>
  </div>
  <div class="row gy-3">
    <div class="col-lg-3 order-2 order-lg-1">
      <div class="border rounded">
        <div class="px-3 pt-3">
          <h3 class="fs-4 fw-normal">{{ $t('trending') }}</h3>
          <p>{{ $t('trendingdescription') }}</p>
        </div>
        <div class="list-group list-group-flush">
          <list view="list-item" />
        </div>
      </div>
    </div>
    <div class="col-lg-9 order-1 order-lg-2">
      <div class="calculator-root">
        <h3 class="fs-4 fw-normal">{{ $t('converter', { symbol: info.symbol, quote: info.quote }) }}</h3>
        <template v-if="ticker.price">
          <Calculator v-bind:info="info" v-bind:currency="currency" v-bind:ticker="ticker" v-bind:key="info.symbol" />
        </template>
        <template v-else>
          <div class="placeholder-glow">
              <div class="rounded placeholder w-100 bg-opacity-10 bg-secondary placeholder__calculator"></div>
            </div>
        </template>
      </div>
      <div class="border rounded p-3 mt-4">
        <h3 class="fs-4 fw-normal">{{ currency.name }} to {{ info.quoteLabel }} chart</h3>
        <div class="chart-root position-relative">
          <template v-if="info.symbol">
            <chart v-bind:tick="ticker.price" v-bind:symbol="info.symbol + '' + info.quote" v-bind:priceScale="info.priceScale" v-bind:priceUnit="info.quote" v-bind:key="info.symbol" />
          </template>
          <template v-else>
            <div class="placeholder-glow">
              <div class="rounded placeholder w-100 mb-4 bg-opacity-10 bg-secondary placeholder__tools"></div>
            </div>
            <div class="placeholder-glow chart-aspect">
              <div class="placeholder bg-opacity-10 bg-secondary position-absolute top-0 w-100 h-100 rounded"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="fs-4 fw-normal">{{ $t('overview') }}</h3>
        <div class="d-flex flex-column flex-xl-row gap-3">
          <div class="d-ticker-card border rounded pt-3 pb-2 ps-3 pe-4">
            <div class="d-ticker-card-header d-flex align-items-center gap-3">
              <img v-bind:src="currency.logo" v-bind:alt="currency.name" width="32" height="32" class="rounded-circle" />
              <div class="d-ticker-card-title">
                <h2 class="fs-6 fw-bold mb-0">{{ info.symbol }} {{ info.quote }}</h2>
                <h3 class="fs-6 fw-light mb-0">{{ info.name }} / {{ info.quoteLabel }}</h3>
              </div>
            </div>
            <div class="d-ticker-card-body mt-2 text-nowrap">
              <span class="d-ticker-card-price fs-3 fw-bold">{{ ticker.localePrice }}</span>
              <span class="d-ticker-card-change ms-4"><arrow v-bind:direction="ticker.direction" /> {{ ticker.change }} %</span>
              <span class="d-ticker-card-rate ms-2 text-secondary">({{ ticker.changePrice }} {{ info.quote }})</span>
            </div>
          </div>
          <div class="d-ticker-card border rounded pt-3 pb-2 ps-3 pe-4 flex-fill">
            <div class="d-ticker-card-header">
              <div class="d-ticker-card-title">
                <h3 class="fs-6 fw-normal mb-0 text-nowrap">{{ $t('highlow') }}</h3>
              </div>
            </div>
            <div class="d-ticker-card-body mt-2">
              <div class="position-relative py-4">
                <small class="position-absolute top-0 start-0 text-muted">{{ $t('low') }}</small>
                <small class="position-absolute top-0 end-0 text-muted">{{ $t('high') }}</small>
                <div class="progress d-progress">
                  <div class="progress-bar" role="progressbar" v-bind:style="'width: ' + progressWidth + '%'" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="position-absolute bottom-0 start-0">{{ $filters.format(stats.low, info.priceScale) }} {{ info.quote }}</small>
                <small class="position-absolute bottom-0 end-0">{{ $filters.format(stats.high, info.priceScale) }} {{ info.quote }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border rounded p-3 mt-4">
        <h3 class="fs-4 fw-normal">What is {{ currency.name }}?</h3>
        <p>{{ currency.about }}</p>
        <a v-bind:href="currency.urls.website" target="_blank" rel="noopener noreferrer" v-bind:title="'Visit ' + info.name + ' website'" class="btn btn-sm btn-primary px-3"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-link me-3" viewBox="0 0 16 16"><path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/></svg>Website</a>
      </div>
    </div>
  </div>
</template>

<script>
import List from './List'
import Arrow from './Arrow'
import Chart from './Chart'
import Calculator from './Calculator'
export default {
  name: 'Detail',
  components: {
    Arrow,
    Calculator,
    Chart,
    List
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  computed: {
    currency () {
      return this.$store.getters.getCurrencyBySlug(this.slug)
    },
    ticker () {
      return this.$store.getters.getTickerBySlug(this.slug)
    },
    info () {
      return this.$store.getters.getInfoBySlug(this.slug)
    },
    stats () {
      return this.$store.getters.getGraphStats()
    },
    progressWidth () {
      return this.ticker.price && this.stats.low && this.stats.high ? this.$arithmetic.fix(this.$arithmetic.times(this.$arithmetic.div(100, this.$arithmetic.minus(this.stats.high, this.stats.low)), this.$arithmetic.minus(this.ticker.price, this.stats.low)), 2) : 0
    }
  }
}
</script>

<style scoped>
.d-header {
  min-height: 74px;
}
.d-progress {
  height: 10px;
}
.placeholder__tools {
  height: 34px;
}
.placeholder__calculator {
  height: 82px;
}
</style>

<style>
.chart-aspect {
  height: 0;
  position: relative;
  padding-top: 56.25%;
}
</style>
