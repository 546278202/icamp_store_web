import Cookies from 'js-cookie'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义vuex
const store = new Vuex.Store({
    state: {
        fixedHeader: true,
        sidebarLogo: true,
        sidebar: {
            opened: true,
            withoutAnimation: false
        },
        device: 'desktop',
        // 登陆状态
        baseUser: JSON.parse(localStorage.getItem("baseUser")),
    },
    mutations: {
        // 登陆状态
        changeLogin(state, data) {
            state.baseUser = JSON.parse(data)
        },


        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 0)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        }
    },

    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        }
    },
    getters: {
        sidebar: state => state.sidebar,
        device: state => state.device,
        avatar: state => state.avatar,
        name: state => state.name
    }

})
export default store
