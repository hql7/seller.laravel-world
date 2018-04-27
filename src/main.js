// 引入样式
require('./assets/css/all.css')
require('./assets/css/clear.css')
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Axios from 'axios'
import util from './util/util'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(util)
Vue.use(ElementUi)


// 初始化网络请求组件(开启跨域请求)
Axios.defaults.withCredentials = true
Axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})


// vue使用axios
Vue.prototype.axios = Axios

// 是否登陆
router.beforeEach((to, from, next) => {
  // NProgress.start();
  store.commit('setPage', 1);
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})

// 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
Axios.interceptors.response.use(function (response) {
  // 全局请求响应若code为2则登录过期 指向登录页
  if (response.data.code === 2) {
    router.push('/login')
  }
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  ElementUi.Message('网络连接失败！请重试');
  return Promise.reject(error)
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
