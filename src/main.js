import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

// /引入封装后的axios
import axios from './utils/http'
Vue.prototype.$http = axios

import Global from './Base'
Vue.prototype.MyGlobal = Global;
// 是否登陆
router.beforeEach((to, from, next) => {
	if (to.matched.some(m => m.meta.auth)) {
		// 对路由进行验证     
		if (store.state.teststore.baseUser != null) {
			next()   // 正常跳转  
		}
		else {
			// 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
			next({ path: '/login', query: { Rurl: to.fullPath } })
		}
	} else {
		next()
	}
})

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
