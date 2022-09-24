<template>
  <div class="d-flex align-items-center">
    <div class="col-12 col-lg-6 border rounded flex-fill p-3 d-flex gap-3 align-items-center">
      <img v-bind:src="info.quoteLogo" v-bind:alt="info.quoteLabel" width="32" height="32" class="rounded-circle" />
      <div class="d-ticker-card-title">
        <h2 class="fs-6 fw-bold mb-0">{{ info.quote }}</h2>
        <h3 class="fs-6 fw-light mb-0">{{ info.quoteLabel }}</h3>
      </div>
      <div class="w-100 d-flex justify-content-end">
        <input pattern="/^-?d+.?d*$/" v-model.lazy="converter.quote" v-on:input="onChangeConverterQuote($event.target.value)" class="py-0 shadow-none border-0 form-control form-control-lg fw-bold text-end" type="text" placeholder="" />
      </div>
    </div>
    <div class="p-3 mx-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
      </svg>
    </div>
    <div class="col-12 col-lg-6 border rounded flex-fill p-3 d-flex gap-3 align-items-center bg-light">
      <img v-bind:src="currency.logo" v-bind:alt="currency.name" width="32" height="32" class="rounded-circle" />
      <div class="d-ticker-card-title">
        <h2 class="fs-6 fw-bold mb-0">{{ info.symbol }}</h2>
        <h3 class="fs-6 fw-light mb-0">{{ info.name }}</h3>
      </div>
      <div class="w-100 d-flex justify-content-end">
        <input pattern="/^-?d+.?d*$/" v-model.lazy="converter.currency" v-on:input="onChangeConverterCurrency($event.target.value)" class="py-0 shadow-none border-0 form-control form-control-lg text-end fw-bold bg-transparent" type="text" placeholder="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  props: {
    currency: {
      type: Object,
      default: () => ({})
    },
    info: {
      type: Object,
      default: () => ({})
    },
    ticker: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onChangeConverterQuote (value) {
      value = parseFloat(value) || 0
      this.converter.currency = this.ticker.price ? parseFloat(value / this.ticker.price).toFixed(this.info.lotScale) : 0
    },
    onChangeConverterCurrency (value) {
      value = parseFloat(value) || 0
      this.converter.quote = this.ticker.price ? parseFloat(value * this.ticker.price).toFixed(this.info.priceScale) : 0
    }
  },
  mounted () {
    this.converter.quote = 100
    this.onChangeConverterQuote(this.converter.quote)
  },
  data () {
    return {
      converter: {
        quote: null,
        currency: null
      }
    }
  }
}
</script>
