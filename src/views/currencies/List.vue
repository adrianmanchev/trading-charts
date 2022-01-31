<template>
  <template v-for="pair in pairs" v-bind:key="pair">
    <component
      v-bind:is="view"
      v-bind:info="infos[pair]"
      v-bind:ticker="tickers[pair]" />
  </template>
</template>

<script>
import {
  mapState
} from 'vuex'
import TableRow from './TableRow'
import ListItem from './ListItem'
export default {
  name: 'List',
  props: {
    view: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState(['pairs', 'tickers', 'infos'])
  },
  components: {
    TableRow,
    ListItem
  }
}
</script>
