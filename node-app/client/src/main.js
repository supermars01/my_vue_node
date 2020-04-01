import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import axios from './http'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'

// import Blob from './excel/Blob'
// import Export2Excel from './excel/Export2Excel.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
