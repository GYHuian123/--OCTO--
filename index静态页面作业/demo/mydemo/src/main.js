// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import './assets/js/remScale.js'
import './assets/iconfont/iconfont.css'

//创建一个图片服务器
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false

//引入vant UI框架
import VantUI from 'vant'
import 'vant/lib/index.css'
Vue.use(VantUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
