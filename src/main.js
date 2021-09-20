import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'



import Router from 'vue-router'
import routerConfig from './router/router-config'
import { sync } from 'vuex-router-sync'
Vue.use(Router)
const router = new Router(routerConfig)
Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)
sync(store, router)



import { titleMixin } from './util/mixins'
Vue.mixin(titleMixin)


import {
  timeAgo,
  host
} from './util/filters'
Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)



Vue.config.productionTip = false

const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})