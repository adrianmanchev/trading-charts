<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" v-bind:class="'bi ' + classnames[direction]"><path fill-rule="evenodd" v-bind:d="paths[direction]"></path></svg>
</template>

<script>
export default {
  name: 'Arrow',
  props: {
    direction: {
      type: String,
      default: 'up'
    }
  },
  data: () => ({
    classnames: {
      down: 'bi-arrow-down-short',
      up: 'bi-arrow-up-short'
    },
    paths: {
      down: 'M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z',
      up: 'M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z'
    }
  })
}
</script>

<style scoped>
.bi {
  transform: rotate(45deg)
}
</style>
