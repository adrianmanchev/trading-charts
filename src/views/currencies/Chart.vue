<template>
  <div class="d-flex mb-4">
    <ul class="d-tabs-list d-flex list-unstyled nav" role="tablist" v-on:click.capture="onClick">
      <template v-for="option in intervals" v-bind:key="option">
        <li v-bind:class="'d-tabs' + (option === interval ? ' active' : '')" role="tab" aria-disabled="false" v-bind:aria-selected="option === interval ? 'true' : 'false'">{{ option }}</li>
      </template>
    </ul>
  </div>
  <div class="chart-aspect">
    <div v-if="!loading" class="chart-content" id="price-chart"></div>
    <div v-else class="w-100 h-100 placeholder-glow position-absolute top-0">
      <div class="placeholder w-100 h-100 bg-opacity-10 bg-secondary rounded"></div>
    </div>
  </div>
</template>

<script>
import chart from '@/helpers/chart'
import binance from '@/helpers/binance'
export default {
  name: 'Chart',
  props: {
    symbol: {
      type: String,
      default: null
    },
    priceScale: {
      type: Number,
      default: null
    },
    priceUnit: {
      type: String,
      default: null
    },
    tick: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    interval () {
      return this.$store.state.graphOptions.interval
    }
  },
  watch: {
    tick (value) {
      if (!this.fn) {
        return false
      }

      this.fn.update(value)
    }
  },
  methods: {
    onSuccess (response) {
      this.loading = false
      const ticks = response.data.map(([t, o, h, l, c]) => [t, c])
      const [low, high] = ticks.reduce((acc, val) => {
        val = parseFloat(val[1])
        acc[0] = (acc[0] === undefined || val < acc[0]) ? val : acc[0]
        acc[1] = (acc[1] === undefined || val > acc[1]) ? val : acc[1]
        return acc
      }, [])

      this.$store.commit('UPDATE_GRAPH_STATS', {
        low: low,
        high: high
      })

      this.$nextTick(() => {
        this.fn = chart(ticks, {
          priceScale: this.priceScale,
          priceUnit: this.priceUnit,
          width: document.getElementById('price-chart').offsetWidth
        })
      })
    },
    request () {
      this.loading = true
      binance.klines(this.symbol, this.interval).then(this.onSuccess).catch(console.log)
    },
    onClick (event) {
      const selection = event.target.innerHTML
      if ((this.interval === selection) || (this.intervals.indexOf(selection) === -1)) {
        return false
      }

      this.$store.commit('UPDATE_GRAPH_OPTIONS', {
        interval: event.target.innerHTML
      })
      this.request()
    }
  },
  mounted: function () {
    this.request(this.symbol, this.interval)
  },
  data: () => ({
    loading: false,
    fn: null,
    intervals: [
      '1m',
      '5m',
      '15m',
      '1h',
      '4h',
      '6h',
      '1d',
      '1w'
    ]
  })
}
</script>

<style scoped>
.d-tabs-list {
  user-select: none;
  background-color: rgb(239, 239, 244);
  border-radius: 0.25rem;
  padding: 3px;
}
.d-tabs-list .d-tabs {
  padding: 7px 8px;
  text-transform: uppercase;
  line-height: 14px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 0.25rem;
  cursor: pointer;
}
.d-tabs-list .d-tabs:hover {
  background-color: rgb(247, 247, 252);
}
.d-tabs-list .d-tabs.active,
.d-tabs-list .d-tabs.active:hover {
  background-color: white;
}
.chart-content {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  user-select: none;
  position: absolute
}
</style>
