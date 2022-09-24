<template>
  <router-link v-bind:to="'/currencies/' + info.slug" v-bind:title="info.name + ' Charts'" v-bind:class="'pt-3 list-group-item list-group-item-action' + (isActive ? '' : ' disabled')" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <div class="d-flex flex-row align-items-center">
        <img class="rounded-circle" v-bind:src="info.logo" width="24" height="24" v-bind:alt="info.name" loading="lazy" /><h5 class="mb-0 pair-meta-symbol">{{ info.symbol }}</h5
        >
      </div>
      <small>
        <template v-if="!ticker.price">-</template>
        <template v-else>{{ ticker.localePrice }} {{ info.quote }}</template>
      </small>
    </div>
    <div class="d-flex w-100 justify-content-between">
      <small class="pair-meta-name">{{ info.name }}</small>
      <small class="pair-daily-change">
        <template v-if="!ticker.change">-</template>
        <template v-else>
          <arrow v-bind:direction="ticker.direction" /> {{ ticker.change }}%
        </template>
      </small>
    </div>
  </router-link>
</template>

<script>
import Arrow from './Arrow'
export default {
  name: 'ListItem',
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    ticker: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Arrow
  },
  computed: {
    isActive () {
      return this.info.status === 'TRADING'
    }
  }
}
</script>

<style scoped>
.pair-meta-symbol {
  margin-left: 17px;
}
.pair-meta-name {
  margin-left: 41px;
}
</style>
