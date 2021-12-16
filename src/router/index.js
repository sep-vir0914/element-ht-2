import Vue from 'vue'
import VueRouter from 'vue-router'
// import navData from '../utils/navData'
import Layout from '@/views/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout', //相当于布局页面
    meta: { tltle: "布局页面" },
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { tltle: "首页" },
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: '/white',
        name: 'White',
        meta: { tltle: "白名单管理" },
        component: () => import('@/views/white/White.vue'),
        children: [
          {
            path: '/white/whiteList',
            name: 'WhiteList',
            meta: { tltle: "白名单列表" },
            component: () => import('@/views/white/WhiteList.vue'),
          },
          {
            path: '/white/addList',
            name: 'AddWhite',
            meta: { tltle: "新增白名单" },
            component: () => import('@/views/white/AddWhite.vue'),
          }
        ]
      },
      {
        path: '/merchant',
        name: 'Merchant',
        meta: { tltle: "商户管理" },
        component: () => import('@/views/merchants/Merchant.vue'),
        children: [
          {
            path: '/merchant/merchantList',
            name: 'MerchantList',
            meta: { tltle: "商户列表" },
            component: () => import('@/views/merchants/MerchantList.vue'),
          },

        ]
      },
      {
        path: '/trading',
        name: 'Trading',
        meta: { tltle: "交易管理" },
        component: () => import('@/views/trading/Trading.vue'),
        children: [
          {
            path: '/trading/tradingDetail',
            name: 'TradingDetail',
            meta: { tltle: "交易明细" },
            component: () => import('@/views/trading/TradingDetail.vue'),
          },
          {
            path: '/trading/tradingRefund',
            name: 'TradingRefund',
            meta: { tltle: "退款管理" },
            component: () => import('@/views/trading/TradingRefund.vue'),
          }
        ]
      },
      // navData.forEach(item => {
      //   routes.push({
      //     path: item.path,
      //     name: item.name,
      //     meta: { tltle: item.title },
      //     component: () => import('@/views/' + item.component),
      //     children:
      //         [{
      //           path: item.children.path,
      //           name: item.children.name,
      //           meta: { tltle:item.children.title },
      //           component: () => import('@/views/' + item.children.component),
      //         }]
      //   })
      // })
    ]

  },

]

const router = new VueRouter({
  routes
})

export default router
