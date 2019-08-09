import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store/store'
import router from './router'

import '@/icons'
import axios from 'axios'
import qs from 'qs'
import Global from './Base'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
console.log(store)
// 允许携带cookie
axios.defaults.withCredentials = true
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	if (config.method == 'post') {
		// config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		// config.headers['Content-Type'] = 'application/json; charset=utf-8';	
		config.headers['Content-Type'] = 'application/json; charset=utf-8';

	}
	if (config.method == 'get') {
		config.data = qs.stringify(config.data);
	}
	console.log("加载中...")
	// NProgress.start()
	// config.headers['Content-Type'] = 'application/json; charset=utf-8';
	return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (config) {
	console.log("关闭loading")
	// NProgress.done()
	return config
}), function (error) {
	return Promise.reject(error)
}

//路由跳转
router.beforeEach((to, from, next) => {
	// start progress bar
	console.log(localStorage.getItem("baseUser"))
	console.log(store.state.baseUser)
	NProgress.start()
	if (to.matched.some(m => m.meta.auth)) {
		if (localStorage.getItem("baseUser")) {
			next()
		}
		else {
			next({ path: '/login', query: { Rurl: to.fullPath } })
		}
	} else {
		next()
	}
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})


Vue.prototype.axios = axios;
Vue.prototype.Global = Global;
Vue.use(ElementUI)
// 阻止启动生产消息
Vue.config.productionTip = false
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
