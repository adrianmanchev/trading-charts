import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import info from './plugins/info'
import ticker from './plugins/ticker'
import arithmetic from './plugins/arithmetic'
import visibility from './plugins/visibility'
import i18n from './i18n'

createApp(App).use(i18n).use(store).use(router).use(arithmetic).use(info).use(ticker).use(visibility).mount('#app')
