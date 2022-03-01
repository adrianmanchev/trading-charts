<template>
  <header class="navbar sticky-top navbar-light navbar-expand-lg navigation-clean">
    <div class="container">
      <h1 class="mb-0">
        <router-link class="navbar-brand" to="/" title="Trading Charts">Trading Charts</router-link>
      </h1>
      <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
        <span class="visually-hidden">Toggle navigation</span
        ><span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcol-1">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/shortcodes" v-bind:title="$t('shortcodes')" exact>{{ $t('shortcodes') }}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/adrianmanchev" target="_blank" rel="noopener noreferrer">{{ $t('about') }}</a>
          </li>
          <li class="nav-item dropdown">
            <a v-bind:class="'dropdown-toggle nav-link' + (show === 'dropdown-language' ? ' opened' : '')" aria-expanded="false" data-bs-toggle="dropdown" href="#" id="dropdown-language" v-on:click.prevent.stop="onDropdown('dropdown-language')">
              {{ language }}
            </a>
            <div v-bind:class="'dropdown-menu dropdown-menu-end' + (show === 'dropdown-language' ? ' show' : '')" aria-labelledby="dropdown-language">
              <template v-for="lang in langs" v-bind:key="lang">
                <a v-bind:class="'dropdown-item hstack' + ($i18n.locale === lang.locale ? ' text-primary': '')" href="#" v-on:click.prevent.stop="onSelect(lang.locale)"><small class="fw-bold me-auto">{{ lang.code }}</small>{{ lang.label }}</a>
              </template>
            </div>
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
  name: 'Header',
  computed: {
    language () {
      const locale = this.$i18n.locale
      return this.langs.filter(i => i.locale === locale)[0].label
    }
  },
  methods: {
    onDropdown (id) {
      this.show = this.show === id ? null : id
    },
    onSelect (locale) {
      this.show = null
      this.$i18n.locale = locale
    }
  },
  data: () => ({
    show: null,
    langs: [
      {
        code: 'EN',
        locale: 'en',
        label: 'English'
      },
      {
        code: 'TR',
        locale: 'tr',
        label: 'Türkçe'
      },
      {
        code: 'BG',
        locale: 'bg',
        label: 'Български'
      }
    ]
  })
}
</script>

<style scoped>
.dropdown-menu {
  right: 18px;
  transform: translateY(1em);
}
.dropdown-toggle.opened::after {
  transform: rotate(180deg);
}
</style>
