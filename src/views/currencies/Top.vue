<template>
  <h2 class="display-6 mb-4">Top Currencies</h2>
  <div class="row gy-3">
    <template v-for="item in topCurrencies" v-bind:key="item.symbol">
      <div class="col">
        <div class="d-flex flex-column h-100 p-5 rounded-3 border bg-light">
          <img v-bind:src="item.logo" v-bind:alt="item.name" width="64" height="64" class="rounded-circle" />
          <h3 class="mt-3 fw-light">{{ item.name }}</h3>
          <p>{{ item.about }}</p>
          <div class="mt-auto">
            <router-link class="btn btn-primary" v-bind:to="'/currencies/' + item.slug" v-bind:title="item.name + 'Charts'">View Charts</router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'Top',
  computed: {
    ...mapGetters(['topCurrencies'])
  }
}
</script>
