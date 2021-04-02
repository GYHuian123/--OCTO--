// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//全局引入封装好的Vuex数据库
import store from './store/index'

//全局引入创建好的css样式
import './assets/css/reset.css'

//创建一个全局服务器变量
Vue.prototype.$imgUrl = 'http://localhost:3000'

//全局引入element-ui库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//全局引入封装好的公共的组件
import gCom from './common'
for (let i in gCom) {
  Vue.component(i, gCom[i])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
