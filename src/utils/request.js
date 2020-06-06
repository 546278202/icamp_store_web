// import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store/store'
// // import { getToken } from '@/utils/auth'

// // 创建axios实例
// const service = axios.create({
//     //   baseURL: process.env.BASE_API, // api的base_url
//     baseURL: "http://39.98.190.128:8080", // api的base_url


//     timeout: 15000 // 请求超时时间
// })

// // loading框设置局部刷新，且所有请求完成后关闭loading框
// let loading
// let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
// function startLoading() {
//     loading = Vue.prototype.$loading({
//         lock: true,
//         text: '努力加载中...',
//         // background: 'rgba(0,0,0,0.2)',
//         target: document.querySelector('.app-main') // 设置加载动画区域
//     })
// }

// function endLoading() {
//     loading.close()
// }

// function showFullScreenLoading() {
//     if (needLoadingRequestCount === 0) {
//         startLoading()
//     }
//     needLoadingRequestCount++
// }

// function hideFullScreenLoading() {
//     if (needLoadingRequestCount <= 0) return
//     needLoadingRequestCount--
//     if (needLoadingRequestCount === 0) {
//         endLoading()
//     }
// }

// // http request 拦截器
// axios.interceptors.request.use(function(config) {
//     if (config.isLoading != false) { // 如果配置了isLoading: false，则不显示loading
//         showFullScreenLoading()
//     }
//     if (config.method == 'post') {
//         config.headers['Content-Type'] = 'application/json; charset=utf-8';
//     }
//     if (config.method == 'get') {
//         config.data = qs.stringify(config.data);
//     }
//     if (config.method == 'patch') {
//         config.headers['Content-Type'] = 'application/json; charset=utf-8';
//     }
//     return config
// }, error => {
//     hideFullScreenLoading()
//     return Promise.reject(error.response)
// });

// // http response 拦截器
// axios.interceptors.response.use(response => {
//     hideFullScreenLoading()
//     return response;
// }, error => {
//     if (error.response) {
//         switch (error.response.status) {
//             case 401:
//                 // ElementUI.Message.error('未授权，请重新登录');
//                 Message.error('未授权，请重新登录');

//                 localStorage.removeItem('baseUser');
//                 router.push('/login');
//                 store.state.baseUser = "";
//                 console.log(store);
//                 break;
//             case 404:
//                 router.push('/status/404');
//                 break;
//             case 500:
//                 Message.error(`服务器异常${error.response.status},请联系管理员！`);
//         }
//     } else {
//         Message.error('请求错误或服务器异常,请联系管理员！');
//     }
//     endLoading()
//     return Promise.reject(error); // 返回接口返回的错误信息
// });

// export default service