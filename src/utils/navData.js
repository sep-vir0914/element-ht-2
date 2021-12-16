// 导航与路由数据
export default [
    {
        name: 'White',
        path: '/white',
        title: '白名单管理',
        component: 'white/White',
        icon: 'el-icon-s-custom',
        children: [
            {
                name: 'WhiteList',
                path: '/white',
                title: '白名单列表',
                component: 'white/WhiteList'
            },
            {
                name: 'AddWhite',
                path: '/white/addList',
                title: '新增白名单',
                component: 'white/AddWhite'
            }
        ]
    },
    {
        name: 'Merchant',
        path: '/merchant',
        title: '商户管理',
        component: 'merchants/Merchant',
        icon: 'el-icon-menu',
        children: [
            {
                name: 'MerchantList',
                path: '/merchant/merchantList',
                title: '商户列表',
                component: 'merchants/MerchantList'
            }
        ]
    },
    {
        name: 'Trading',
        path: '/trading',
        title: '交易管理',
        component: 'trading/Trading',
        icon: 'el-icon-wallet',
        children: [
            {
                name: 'TradingDetail',
                path: '/trading/tradingDetail',
                title: '交易明细',
                component: 'trading/TradingDetail'
            },
            {
                name: 'TradingRefund',
                path: '/trading/tradingRefund',
                title: '退款管理',
                component: 'trading/TradingRefund'
            }
        ]
    }
]