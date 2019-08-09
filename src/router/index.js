import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    // 登陆
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    // 404
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    // 默认首页
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard', auth: true }
        }]
    },
    // 基本信息
    {
        path: '/base',
        component: Layout,
        redirect: '/base',
        name: 'base',
        meta: { title: '基本信息', icon: 'documentation' },
        children: [
            {
                path: 'accountset',
                name: 'accountset',
                component: () => import('@/views/base/accountset'),
                meta: { title: '账户设置', icon: '', auth: true }
            },
            {
                path: 'system',
                name: 'system',
                component: () => import('@/views/base/system'),
                meta: { title: '系统信息', icon: '', auth: true }
            },
            {
                path: 'log',
                name: 'log',
                component: () => import('@/views/base/log'),
                meta: { title: '登陆日志', icon: '', auth: true }
            }
        ]
    },
    // 商品
    {
        path: '/shop',
        component: Layout,
        redirect: '/shop',
        name: 'shop',
        meta: { title: '商品', icon: 'shopping' },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/shop/list'),
                meta: { title: '商品列表', icon: '', auth: true }
            },
            {
                path: 'addshop1',
                name: 'addshop1',
                component: () => import('@/views/shop/addshop/addshop1'),
                meta: { title: '添加商品', icon: '', auth: true },

            },
            {
                path: 'addshop2',
                name: 'addshop2',
                component: () => import('@/views/shop/addshop/addshop2'),
            },
            {
                path: 'shoptype',
                name: 'shoptype',
                component: () => import('@/views/shop/shoptype'),
                meta: { title: '商品类型', icon: '', auth: true }
            }
        ]
    },
    // 订单
    {
        path: '/order',
        component: Layout,
        redirect: '/order',
        name: 'order',
        meta: { title: '订单', icon: 'list' },
        children: [
            {
                path: 'orderlist',
                name: 'orderlist',
                component: () => import('@/views/order/orderlist'),
                meta: { title: '订单列表', auth: true }
            },
            {
                path: 'orderdetail',
                name: 'orderdetail',
                component: () => import('@/views/order/orderdetail'),
            },
            {
                path: 'refund',
                name: 'refund',
                component: () => import('@/views/order/refund'),
                meta: { title: '退款申请', auth: true }
            }

        ]
    },
    // 用户
    {
        path: '/user',
        component: Layout,
        redirect: '/user',
        name: 'user',
        meta: { title: '用户', icon: 'user' },
        children: [
            {
                path: 'userlist',
                name: 'userlist',
                component: () => import('@/views/user/userlist'),
                meta: { title: '用户列表', icon: '', auth: true }
            },
            {
                path: 'tablist',
                name: 'tablist',
                component: () => import('@/views/user/tablist'),
                meta: { title: '标签管理', icon: '', auth: true }
            }
        ]
    },
    // 内容
    {
        path: '/content',
        component: Layout,
        redirect: '/content',
        name: 'content',
        meta: { title: '内容', icon: 'content' },
        children: [
            {
                path: 'contentlist',
                name: 'contentlist',
                component: () => import('@/views/content/contentlist'),
                meta: { title: '内容列表', icon: '', auth: true }
            },
            {
                path: 'type_admin',
                name: 'type_admin',
                component: () => import('@/views/content/type_admin'),
                meta: { title: '分类管理', icon: '', auth: true }
            }
        ]
    },
    // 系统管理
    {
        path: '/systemadmin',
        component: Layout,
        redirect: '/systemadmin',
        name: 'systemadmin',
        meta: { title: '系统管理', icon: 'edit' },
        children: [
            {
                path: 'isoff',
                name: 'isoff',
                component: () => import('@/views/systemadmin/isoff'),
                meta: { title: '开关设置', icon: '', auth: true }
            },
            {
                path: 'paramer',
                name: 'paramer',
                component: () => import('@/views/systemadmin/paramer'),
                meta: { title: '参数设置', icon: '', auth: true }
            },
            {
                path: 'xuandan',
                name: 'xuandan',
                component: () => import('@/views/systemadmin/xuandan'),
                meta: { title: '选单设置', icon: '', auth: true }
            }, {
                path: 'setmodule',
                name: 'setmodule',
                component: () => import('@/views/systemadmin/setmodule'),
                meta: { title: '模块设置', icon: '', auth: true }
            },
            {
                path: 'setorganization',
                name: 'setorganization',
                component: () => import('@/views/systemadmin/setorganization'),
                meta: { title: '组织设置', icon: '', auth: true }
            },
            {
                path: 'setauthority',
                name: 'setauthority',
                component: () => import('@/views/systemadmin/setauthority'),
                meta: { title: '权限设置', icon: '', auth: true }
            }
        ]
    },

    // 404 
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}
export default router
