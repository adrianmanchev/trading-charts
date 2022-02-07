<template>
  <tr v-bind:class="'pair-row' + (isActive ? '' : ' opacity-50')">
    <td class="pair-meta">
      <div class="d-flex flex-row align-items-center">
        <img class="rounded-circle" v-bind:src="info.logo" width="24" height="24" v-bind:alt="info.name" loading="lazy" /><span class="pair-meta-symbol fw-bold">{{ info.symbol }}</span
        ><span class="pair-meta-name">{{ info.name }}</span>
      </div>
    </td>
    <td v-bind:class="'pair-daily-change text-end color-' + ticker.direction">
      <template v-if="!ticker.change">-</template>
      <template v-else>
        <arrow v-bind:direction="ticker.direction" /> {{ ticker.change }} %
      </template>
    </td>
    <td class="text-end fw-bold">
      <template v-if="!ticker.price">-</template>
      <template v-else>{{ ticker.localePrice }} {{ info.quote }}</template>
    </td>
    <td class="text-end">
      <div class="d-grid d-flex justify-content-end">
        <router-link v-bind:to="'/currencies/' + info.slug" v-bind:class="'btn btn-light btn-sm col-lg-6' + (isActive ? '' : ' disabled')" role="button" v-bind:title="info.name + ' Charts'">Detail</router-link>
      </div>
    </td>
  </tr>
</template>

<script>
import Arrow from './Arrow'
export default {
  name: 'TableRow',
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
.pair-meta .pair-meta-symbol {
  margin-left: 17px;
}
.pair-meta .pair-meta-name {
  margin-left: 7px;
  color: var(--bs-gray)
}
.table-body tr td {
  padding-top: 16px;
  padding-bottom: 16px;
}
.table-body tr:last-child td {
  border-bottom-width: 0px;
}
</style>
