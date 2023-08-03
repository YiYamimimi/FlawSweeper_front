import Vue from 'vue'
import App from './App.vue'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// router
import VueRouter from 'vue-router';
import router from './router'
//echart
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
// axios
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8082"
// 在请求中自动携带 JWT Token 的拦截器 
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
})
Vue.prototype.$axios = axios


Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
}).$mount('#app')
