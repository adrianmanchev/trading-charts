<template>
  <header class="navbar sticky-top navbar-light navbar-expand-lg navigation-clean">
    <div class="container">
      <h1>
        <router-link class="navbar-brand" to="/" title="Trading Charts">Trading Charts</router-link>
      </h1>
      <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
        <span class="visually-hidden">Toggle navigation</span
        ><span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcol-1">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/shortcodes" title="Shortcodes" exact>Shortcodes</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/adrianmanchev" target="_blank" rel="noopener noreferrer">About</a>
          </li>
          <li v-if="$t" class="nav-item dropdown">
            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
              English
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="#">English<span class="text-muted" style="margin-left: 7px">EN</span></a>
              <a class="dropdown-item" href="#">Türkçe<span class="text-muted" style="margin-left: 7px">TR</span></a>
            </div>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link disabled" href="#" target="_blank" rel="noopener noreferrer">Language <sup class="badge rounded-pill bg-primary">Coming soon</sup></a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" target="_blank" rel="noopener noreferrer">Currency <sup class="badge rounded-pill bg-primary">Coming soon</sup></a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>
