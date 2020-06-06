import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import store from './store/store'
import router from './router'
import '@/icons'
import axios from 'axios'
import qs from 'qs'
import Global from './Base'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
axios.defaults.withCredentials = true
    // loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading() {
    loading = Vue.prototype.$loading({
        lock: true,
        text: '努力加载中...',
        background: 'rgba(255,255,255,0.8)',
        target: document.querySelector('.app-main') // 设置加载动画区域
    })
}

function endLoading() {
    loading.close()
}

function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

// http request 拦截器
axios.interceptors.request.use(function(config) {
    if (config.isLoading != false) { // 如果配置了isLoading: false，则不显示loading
        showFullScreenLoading()
    }
    if (config.method == 'post') {
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    if (config.method == 'get') {
        config.data = qs.stringify(config.data);
    }
    if (config.method == 'patch') {
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    return config
}, error => {
    hideFullScreenLoading()
    return Promise.reject(error.response)
});

// http response 拦截器
axios.interceptors.response.use(response => {
    hideFullScreenLoading()
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                ElementUI.Message.error('未授权，请重新登录');
                localStorage.removeItem('baseUser');
                this.$store.state.baseUser = "";
                console.log(this.$store);
                router.push('/login');
                // next({ path: '/login', query: { Rurl: to.fullPath } })
                break;
            case 404:
                router.push('/status/404');
                break;
            case 500:
                ElementUI.Message.error(`服务器异常${error.response.status},请联系管理员！`);
        }
    } else {
        ElementUI.Message.error('请求错误或服务器异常,请联系管理员！');
    }
    endLoading()
    return Promise.reject(error); // 返回接口返回的错误信息
});

//路由跳转
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.matched.some(m => m.meta.auth)) {
        if (localStorage.getItem("baseUser")) {
            next()
        } else {
            next({ path: '/login', query: { Rurl: to.fullPath } })
        }
    } else {
        next()
    }
})

router.afterEach(() => {
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