// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ReactiveSearch from '@appbaseio/reactivesearch-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoadingButton from 'vue-loading-button'

Vue.prototype.$http = axios
// we can now use axios like 'this.$http'

Vue.config.productionTip = false

Vue.use(ReactiveSearch)
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, VueLoadingButton },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
