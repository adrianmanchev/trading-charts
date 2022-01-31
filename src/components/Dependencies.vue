<template>
  <section class="team-boxed">
    <div class="container">
      <div class="intro">
        <h2 class="text-center">Dependencies</h2>
        <p class="text-center">The following is a list of the packages that are required for the production of this example page.</p>
      </div>
      <div class="row people">
        <template v-for="item in items" v-bind:key="item.key">
          <div class="col-md-6 col-lg-3 item">
            <div class="box rounded">
              <img
                v-bind:src="item.image"
                v-bind:alt="item.name"
                height="90" />
              <h3 class="name">{{ item.name }}</h3>
              <p class="title">{{ item.title }}</p>
              <p class="d-lg-flex justify-content-lg-center align-items-lg-center description ">{{ item.description }}</p>
              <div class="social">
                <a v-bind:href="item.url" v-bind:title="item.name" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-github"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Dependencies',
  data: () => ({
    items: [
      {
        key: 'websocket',
        name: 'WebSocket',
        title: 'API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket',
        description: 'Interactive communication session between the user\'s browser and a server.',
        image: require('../assets/img/websocket.svg')
      },
      {
        key: 'vue-js',
        name: 'Vue.js',
        title: 'FRAMEWORK',
        url: 'https://github.com/vuejs/vue',
        description: 'The Progressive JavaScript Framework',
        image: require('../assets/img/vue.svg')
      },
      {
        key: 'bootstrap',
        name: 'Bootstrap',
        title: 'FRAMEWORK',
        url: 'https://github.com/twbs/bootstrap',
        description: 'Build fast, responsive sites with Bootstrap',
        image: require('../assets/img/bootstrap.png')
      },
      {
        key: 'd3-js',
        name: 'd3.js',
        title: 'VISUALIZING',
        url: 'https://github.com/d3/d3',
        description: 'Library for visualizing data using web standards',
        image: require('../assets/img/d3.svg')
      }
    ]
  })
}
</script>

<style scoped>
.team-boxed .description {
  min-height: 120px;
}
.team-boxed .title {
  user-select: none;
}
</style>
