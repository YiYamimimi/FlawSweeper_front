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
// this.$echarts更符合Vue的命名约定
Vue.prototype.$echarts = echarts
// axios
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8082"
// 在请求中自动携带 JWT Token 的拦截器 
/* 请求拦截器（在请求之前进行一些配置，如在请求中自动携带 JWT Token）
1、axios.interceptors.request.use()：这是Axios的请求拦截器方法，用于拦截发出的请求，并进行相应的处理。

2、config：这是拦截器回调函数的参数，表示当前请求的配置对象。

3、const token = localStorage.getItem('token');：
这行代码从浏览器的本地存储(localStorage)中获取名为token的值，
通常用于存储用户的身份认证令牌。

4、if (token) { config.headers.Authorization = token; }：
如果token存在，将它添加到请求的Authorization请求头中。
这是一种常见的方式，在请求中附加身份验证令牌，以便后端服务器验证用户身份。

5、return config;：
返回修改后的请求配置，确保继续发送请求。
 */
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
})
/**
 * this.$axios更符合Vue的命名约定，也更常见
 * 以$开头的属性或方法表示Vue实例的全局属性或插件
 * 为了避免与Vue的内部方法和属性冲突，使用this.$axios来调用Axios的方法发送HTTP请求。
 * 这需要在Vue实例的created钩子函数中进行配置
*/
Vue.prototype.$axios = axios


Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
}).$mount('#app')
/**
 * 
1、new Vue({})：创建Vue实例，传入一个配置对象作为参数。

2、el: '#app'：指定Vue实例挂载的DOM元素，这里是id为app的元素。

3、router: router：指定Vue实例使用的路由器。这里的router是通过import语句导入的一个名为router的变量，通常表示Vue应用程序的路由配置。

4、render: h => h(App)：指定Vue实例的渲染函数。这里使用了ES6箭头函数的语法，相当于render: function(h) { return h(App); }。渲染函数用于将组件渲染成虚拟DOM。

5、$mount('#app')：手动将Vue实例挂载到指定的DOM元素上，这里是id为app的元素。

这段代码的作用是创建Vue实例，并将其挂载到id为app的DOM元素上。Vue实例可以通过配置对象中的router属性指定路由器，通过render属性指定渲染函数来渲染组件，最后通过$mount方法手动将Vue实例挂载到指定的DOM元素上。

这样，Vue应用程序就可以在指定的DOM元素中进行渲染和交互。
 */
