import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
    /* Layout */
import Layout from '@/layout'
export const constantRoutes = [
    // 登陆
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
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
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页管理', icon: 'dashboard', auth: true }
        }]
    },
    // status
    {
        path: '/status',
        component: Layout,
        redirect: '/status',
        name: 'base',
        meta: { title: '状态码', icon: 'documentation' },
        hidden: true,
        children: [{
                path: '404',
                name: '404',
                component: () =>
                    import ('@/views/status/404'),
                meta: { title: '404', icon: 'dashboard', auth: true }
            },
            {
                path: '401',
                name: '401',
                component: () =>
                    import ('@/views/status/401'),
                meta: { title: '401', icon: 'dashboard', auth: true }
            }
        ]
    },
    // 基本信息
    {
        path: '/base',
        component: Layout,
        redirect: '/base',
        name: 'base',
        meta: { title: '基本信息', icon: 'documentation' },
        children: [{
                path: 'accountset',
                name: 'accountset',
                component: () =>
                    import ('@/views/base/accountset'),
                meta: { title: '账户设置', icon: '', auth: true }
            },
            {
                path: 'system',
                name: 'system',
                component: () =>
                    import ('@/views/base/system'),
                meta: { title: '系统信息', icon: '', auth: true }
            },
            {
                path: 'log',
                name: 'log',
                component: () =>
                    import ('@/views/base/log'),
                meta: { title: '登陆日志', icon: '', auth: true }
            }
        ]
    },
    // 商品管理
    {
        path: '/pms',
        component: Layout,
        redirect: '/pms/product',
        name: 'pms',
        meta: { title: '营会管理', icon: 'shopping' },
        children: [{
                path: 'product',
                name: 'product',
                component: () =>
                    import ('@/views/pms/product/index'),
                meta: { title: '营会列表', icon: '', auth: true }
            },
            {
                path: 'addProduct',
                name: 'addProduct',
                component: () =>
                    import ('@/views/pms/product/add'),
                meta: { title: '添加营会', icon: '', auth: true, },
                hidden: true

            },
            {
                path: 'updateProduct',
                name: 'updateProduct',
                component: () =>
                    import ('@/views/pms/product/update'),
                meta: { title: '修改营会', icon: '', auth: true, },
                hidden: true
            },
            {
                path: 'productCate',
                name: 'productCate',
                component: () =>
                    import ('@/views/pms/productCate/index'),
                meta: { title: '营会类型', icon: '', auth: true }
            },
            {
                path: 'tags',
                name: 'tags',
                component: () =>
                    import ('@/views/pms/tags/index'),
                meta: { title: '标签', icon: '', auth: true },
                hidden: true
            }
        ],
    },
    // 订单管理
    {
        path: '/oms',
        component: Layout,
        redirect: '/oms/order',
        name: 'oms',
        meta: { title: '订单管理', icon: 'list' },
        children: [{
                path: 'order',
                name: 'order',
                component: () =>
                    import ('@/views/oms/order/index'),
                meta: { title: '订单列表', icon: '', auth: true }
            },
            {
                path: 'orderDetail',
                name: 'orderDetail',
                component: () =>
                    import ('@/views/oms/order/orderDetail'),
                meta: { title: '订单详情' },
                hidden: true
            },
            {
                path: 'deliverOrderList',
                name: 'deliverOrderList',
                component: () =>
                    import ('@/views/oms/order/deliverOrderList'),
                meta: { title: '发货列表' },
                hidden: true
            },
            {
                path: 'orderSetting',
                name: 'orderSetting',
                component: () =>
                    import ('@/views/oms/order/setting'),
                meta: { title: '订单设置', icon: '' }
            },
            {
                path: 'orderExchange',
                name: 'orderExchange',
                component: () =>
                    import ('@/views/oms/order/exchange'),
                meta: { title: '申请换货' },
                hidden: true
            },
            {
                path: 'returnApply',
                name: 'returnApply',
                component: () =>
                    import ('@/views/oms/apply/index'),
                meta: { title: '售后申请处理', icon: '' }
            },
            {
                path: 'returnReason',
                name: 'returnReason',
                component: () =>
                    import ('@/views/oms/apply/reason'),
                meta: { title: '退款原因设置', icon: '' }
            },
            {
                path: 'returnApplyDetail',
                name: 'returnApplyDetail',
                component: () =>
                    import ('@/views/oms/apply/applyDetail'),
                meta: { title: '退款原因详情' },
                hidden: true
            },
            {
                path: 'postponeApplyDetail',
                name: 'postponeApplyDetail',
                component: () =>
                    import ('@/views/oms/apply/postponeDetail'),
                meta: { title: '延期原因详情' },
                hidden: true
            },
            {
                path: 'exchangeApplyDetail',
                name: 'exchangeApplyDetail',
                component: () =>
                    import ('@/views/oms/apply/exchangeDetail'),
                meta: { title: '更换原因详情' },
                hidden: true
            }
        ]
    },
    // 内容管理
    {
        path: '/content',
        component: Layout,
        redirect: '/content/product',
        name: 'content',
        meta: { title: '内容管理', icon: 'content' },
        children: [{
                path: 'product',
                name: 'product',
                component: () =>
                    import ('@/views/content/product/index'),
                meta: { title: '内容列表', icon: '', auth: true }
            },
            {
                path: 'addProduct',
                name: 'addProduct',
                component: () =>
                    import ('@/views/content/product/add'),
                meta: { title: '添加内容', icon: '', auth: true, },
                hidden: true

            },
            {
                path: 'updateProduct',
                name: 'updateProduct',
                component: () =>
                    import ('@/views/content/product/update'),
                meta: { title: '修改内容', icon: '', auth: true, },
                hidden: true
            },
            {
                path: 'productCate',
                name: 'productCate',
                component: () =>
                    import ('@/views/content/productCate/index'),
                meta: { title: '内容类型', icon: '', auth: true }
            },
            {
                path: 'tags',
                name: 'tags',
                component: () =>
                    import ('@/views/content/tags/index'),
                meta: { title: '内容标签', icon: '', auth: true },
                hidden: true
            }
        ],
    },
    // 用户管理
    {
        path: '/ums',
        component: Layout,
        redirect: '/ums/user',
        name: 'ums',
        meta: { title: '用户管理', icon: 'user' },
        children: [{
                path: 'user',
                name: 'user',
                component: () =>
                    import ('@/views/ums/user'),
                meta: { title: '用户列表', icon: '', auth: true }
            },
            {
                path: 'userDetail',
                name: 'userDetail',
                component: () =>
                    import ('@/views/ums/user/userDetail'),
                meta: { title: '用户详情' },
                hidden: true
            },
            {
                path: 'userSet',
                name: 'userSet',
                component: () =>
                    import ('@/views/ums/user/userSet'),
                meta: { title: '编辑' },
                hidden: true
            },
            {
                path: 'camper',
                name: 'camper',
                component: () =>
                    import ('@/views/ums/camper'),
                meta: { title: '营员列表', icon: '', auth: true, },

            }
        ],
    },
    // 用户管理
    // {
    //     path: '/user',
    //     component: Layout,
    //     redirect: '/user',
    //     name: 'user',
    //     meta: { title: '用户管理', icon: 'user' },
    //     children: [{
    //             path: 'index',
    //             name: 'index',
    //             component: () =>
    //                 import ('@/views/user/index'),
    //             meta: { title: '用户列表', icon: '', auth: true }
    //         },
    //         {
    //             path: 'userDetail',
    //             name: 'userDetail',
    //             component: () =>
    //                 import ('@/views/user/userDetail'),
    //             meta: { title: '用户详情' },
    //             hidden: true
    //         },
    //         {
    //             path: 'userSet',
    //             name: 'userSet',
    //             component: () =>
    //                 import ('@/views/user/userSet'),
    //             meta: { title: '编辑' },
    //             hidden: true
    //         },
    //     ]
    // },

    // 权限管理
    {
        path: '/authorityadmin',
        component: Layout,
        redirect: '/authorityadmin',
        name: 'authorityadmin',
        meta: { title: '权限管理', icon: 'edit' },
        children: [{
                path: 'setpartment',
                name: 'setpartment',
                component: () =>
                    import ('@/views/authorityadmin/setpartment'),
                meta: { title: '部门设置', icon: '', auth: true }
            },
            {
                path: 'setstaff',
                name: 'setstaff',
                component: () =>
                    import ('@/views/authorityadmin/setstaff'),
                meta: { title: '成员设置', icon: '', auth: true }
            },
            {
                path: 'setauthority',
                name: 'setauthority',
                component: () =>
                    import ('@/views/authorityadmin/setauthority'),
                // meta: { title: '人员设置', icon: '', auth: true }
            },
        ]
    },
    // 404 
    { path: '*', redirect: '/status/404', hidden: false }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    // mode: 'history'
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}
export default router