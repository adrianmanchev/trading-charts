<template>
  <div class="d-header d-flex gap-4 align-items-center mb-4">
    <img v-bind:src="currency.logo" v-bind:alt="currency.name" width="48" height="48" class="rounded-circle" />
    <div class="d-title">
      <h2 class="display-6 fw-light mb-0">{{ info.symbol }}</h2>
      <h3 class="fw-normal text-muted fs-6 mb-0 lh-sm">{{ currency.name }} price</h3>
    </div>
    <div v-if="ticker.price" class="d-ticker">
      <div class="display-6 fw-light">{{ ticker.localePrice }} {{ info.quote }}</div>
      <div v-bind:class="'fw-normal fs-5 lh-sm text-end color-' + ticker.direction"><arrow v-bind:direction="ticker.direction" /> {{ ticker.change }} %</div>
    </div>
  </div>
  <div class="row gy-3">
    <div class="col-lg-3">
      <div class="border rounded">
        <div class="px-3 pt-3">
          <h3 class="fs-4 fw-normal">Trending assets</h3>
          <p>Individual cryptocurrency exchanges' most popular assets have risen in popularity over time.</p>
        </div>
        <div class="list-group list-group-flush">
          <list view="list-item" />
        </div>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="border rounded p-3">
        <h3 class="fs-4 fw-normal">{{ currency.name }} to {{ info.unit }} chart</h3>
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
      <div class="border rounded p-3 mt-3">
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
export default {
  name: 'Detail',
  components: {
    Arrow,
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
    }
  }
}
</script>

<style scoped>
.d-header {
  min-height: 74px;
}
.placeholder__tools {
  height: 34px;
}
</style>

<style>
.chart-aspect {
  height: 0;
  position: relative;
  padding-top: 56.25%;
}
</style>
