<template>
  <main class="home-root">
    <banner-root />
    <currency-section />
    <dependencies />
  </main>
</template>

<script>
import BannerRoot from '@/components/Banner'
import CurrencySection from '@/views/currencies/Section'
import Dependencies from '@/components/Dependencies'

export default {
  name: 'Home',
  components: {
    BannerRoot,
    CurrencySection,
    Dependencies
  }
}
</script>
