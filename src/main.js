import Vue from 'vue'
import App from './App.vue'
import { apolloClient } from './vue-apollo'
import VueApollo from 'vue-apollo'
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
