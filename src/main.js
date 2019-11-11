import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive.js'
import messagePlugin from '@/utils/message.plugin.js'
import Loader from '@/components/App/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyD26FoHpqMMSsvK3j5qWb4b0RCReHnyekU",
  authDomain: "vue-you.firebaseapp.com",
  databaseURL: "https://vue-you.firebaseio.com",
  projectId: "vue-you",
  storageBucket: "vue-you.appspot.com",
  messagingSenderId: "193641770506",
  appId: "1:193641770506:web:417397d20da75ab3a2f9f3",
  measurementId: "G-VGVBXLQ7PF"
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})