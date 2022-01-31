<template>
  <header-block />
  <router-view />
  <footer-block />
</template>

<script>
import HeaderBlock from '@/components/Header'
import FooterBlock from '@/components/Footer'
export default {
  name: 'Home',
  components: {
    HeaderBlock,
    FooterBlock
  }
}
</script>

<style>
@import './assets/css/styles.min.css';
.color-up {
  color: var(--bs-green)
}
.color-down {
  color: var(--bs-red)
}
</style>
