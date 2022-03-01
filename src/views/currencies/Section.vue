<template>
  <div class="container my-4">
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <caption class="display-6 caption-top">
          {{ $t('liveprices') }}
        </caption>
        <thead class="table-head">
          <tr>
            <th>{{ $t('name') }}</th>
            <th class="text-end">{{ $t('dailychange') }}</th>
            <th class="text-end">{{ $t('price') }}</th>
            <th class="text-end"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <list view="table-row" />
        </tbody>
      </table>
    </div>
    <i18n-t keypath="more" tag="p">
      <template v-slot:action>
        <router-link to="/currencies" v-bind:title="$t('toptitle')">{{ $t('top') }}</router-link>
      </template>
    </i18n-t>
  </div>
</template>

<script>
import List from './List'
export default {
  name: 'CurrencySection',
  components: {
    List
  }
}
</script>

<style scoped>
.table-head {
  color: var(--bs-gray-500);
  font-size: 13px;
  border-width: 2px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-left-width: 0px;
}
.table-body {
  border-width: 1px;
  border-right-width: 0px;
  border-left-width: 0px;
  border-bottom-width: 0px;
  font-size: 17px;
  white-space: nowrap;
}
</style>
