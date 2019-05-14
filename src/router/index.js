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
      name: '首页',
      component: () => import('@/views/dashboard/index')
      // meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 首页
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '系统首页', icon: '' }
      },
      {
        path: 'accountset',
        name: 'accountset',
        component: () => import('@/views/dashboard/accountset'),
        meta: { title: '账户设置', icon: '' }
      },
      {
        path: 'system',
        name: 'system',
        component: () => import('@/views/dashboard/system'),
        meta: { title: '系统信息', icon: '' }
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/views/dashboard/log'),
        meta: { title: '登陆日志', icon: '' }
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
        meta: { title: '商品列表', icon: '' }
      },
      {
        path: 'addshop1',
        name: 'addshop1',
        component: () => import('@/views/shop/addshop/addshop1'),
        meta: { title: '添加商品', icon: '' }
      },
      {
        path: 'addshop2',
        name: 'addshop2',
        component: () => import('@/views/shop/addshop/addshop2'),
        // meta: { title: '添加商品', icon: '' }
      },
      {
        path: 'shoptype',
        name: 'shoptype',
        component: () => import('@/views/shop/shoptype'),
        meta: { title: '商品类型', icon: '' }
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
      // {
      //   path: 'orderlist',
      //   name: 'orderlist',
      //   component: () => import('@/views/order/orderlist'),
      //   meta: { title: '订单列表', }
      // },
      {
        path: 'refund',
        name: 'refund',
        component: () => import('@/views/order/refund'),
        meta: { title: '退款申请', }
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
        meta: { title: '用户列表', icon: '' }
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
