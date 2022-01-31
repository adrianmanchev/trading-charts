<template>
  <main class="container my-4">
    <currencies-top v-if="!slug" />
    <currencies-detail v-else :slug="slug" />
  </main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'Currencies',
  components: {
    CurrenciesTop: defineAsyncComponent(() =>
      import(/* webpackChunkName: "currencies-top" */ './Top')
    ),
    CurrenciesDetail: defineAsyncComponent(() =>
      import(/* webpackChunkName: "currencies-detail" */ './Detail')
    )
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  }
}
</script>
