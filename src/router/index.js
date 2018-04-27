import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'login'}},
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/login/login.vue'], resolve)
    },
    {
      path: '/view',
      name: 'view',
      component: resolve => require(['../components/view.vue'], resolve),
      children: [
        {
          path: '/view',
          redirect: '/index'
        },
        {
          path: '/index',
          name: 'index',
          component: resolve => require(['../views/index/index.vue'], resolve)
        },
        // 商品 - 在售商品列表
        {
          path: '/goods/insale-list',
          name: '1-1',
          component: reslove => require(['../views/goods/insale-list.vue'], reslove)
        },
        // 商品 - 下架商品列表
        {
          path: '/goods/outsale-list',
          name: '1-2',
          component: reslove => require(['../views/goods/outsale-list.vue'], reslove)
        },
        // 商品 - 商品规格
        {
          path: '/goods/goods-spec',
          name: '1-3',
          component: reslove => require(['../views/goods/goods-spec.vue'], reslove)
        },
        // 商品 - 商品品牌
        {
          path: '/goods/goods-brand',
          name: '1-4',
          component: reslove => require(['../views/goods/goods-brand.vue'], reslove)
        },
        // 商品 - 商品类型
        {
          path: '/goods/goods-type',
          name: '1-5',
          component: reslove => require(['../views/goods/goods-type.vue'], reslove)
        },
        // 订单 - 订单列表
        {
          path: '/order/order-list',
          name: '2-1',
          component: reslove => require(['../views/order/order-list.vue'], reslove)
        },
        // 订单 - 回收站订单
        {
          path: '/order/recycle-bin',
          name: '2-2',
          component: reslove => require(['../views/order/order-recycle-bin.vue'], reslove)
        },
        // 订单 - 收款单
        {
          path: '/order/receipt',
          name: '2-3',
          component: reslove => require(['../views/order/order-receipt.vue'], reslove)
        },
        // 订单 - 发货单
        {
          path: '/order/invoice',
          name: '2-4',
          component: reslove => require(['../views/order/order-invoice.vue'], reslove)
        },
        // 订单 - 评价
        {
          path: '/order/evaluate',
          name: '2-7',
          component: reslove => require(['../views/order/goods-evaluate.vue'], reslove)
        },
        // 订单 - 运费
        {
          path: '/order/freight',
          name: '2-8',
          component: reslove => require(['../views/order/system-freight.vue'], reslove)
        },
        // 促销 - 商品促销
        {
          path: '/sales/goods-sales',
          name: '3-1',
          component: reslove => require(['../views/sales/sales-promotion.vue'], reslove)
        },
        // 促销 - 订单促销
        {
          path: '/sales/order-sales',
          name: '3-2',
          component: reslove => require(['../views/sales/sales-order.vue'], reslove)
        },
        // 促销 - 捆绑促销
        {
          path: '/sales/bundles-sales',
          name: '3-3',
          component: reslove => require(['../views/sales/sales-bundles.vue'], reslove)
        },
        // 促销 - 团购促销
        {
          path: '/sales/group-sales',
          name: '3-4',
          component: reslove => require(['../views/sales/sales-group.vue'], reslove)
        },
        // 促销 - 限时抢购
        {
          path: '/sales/flash-sales',
          name: '3-5',
          component: reslove => require(['../views/sales/sales-flash.vue'], reslove)
        },
        // 促销 - 代金券模版
        {
          path: '/sales/voucher-template',
          name: '3-6',
          component: reslove => require(['../views/sales/voucher-template.vue'], reslove)
        },
        // 促销 - 代金券管理
        {
          path: '/sales/voucher-adm',
          name: '3-7',
          component: reslove => require(['../views/sales/voucher-adm.vue'], reslove)
        },
        // 店铺 - 店铺设置
        {
          path: '/shop/site',
          name: '4-1',
          component: reslove => require(['../views/shop/shop-site.vue'], reslove)
        },
        // 店铺 - 首页管理
        {
          path: '/shop/index',
          name: '4-8',
          component: reslove => require(['../views/shop/floor-ad.vue'], reslove)
        },
        // 店铺 - 店铺导航
        {
          path: '/shop/nav',
          name: '4-2',
          component: reslove => require(['../views/shop/cms-nav.vue'], reslove)
        },
        // 店铺 - 经营类目
        {
          path: '/shop/business-category',
          name: '4-3',
          component: reslove => require(['../views/shop/business-category.vue'], reslove)
        },
        // 店铺 - 店铺信息
        {
          path: '/shop/info',
          name: '4-4',
          component: reslove => require(['../views/shop/shop-info.vue'], reslove)
        },
        // 店铺 - 店铺分类
        {
          path: '/shop/cate',
          name: '4-5',
          component: reslove => require(['../views/shop/shop-cate.vue'], reslove)
        },
        // 店铺 - 店铺关注
        {
          path: '/shop/member',
          name: '4-6',
          component: reslove => require(['../views/shop/shop-member.vue'], reslove)
        },
        // 店铺 - 店铺动态
        {
          path: '/shop/trends',
          name: '4-7',
          component: reslove => require(['../views/shop/shop-trends.vue'], reslove)
        },
        // 售后 - 退款单
        {
          path: '/after-sale/order-refund',
          name: '5-1',
          component: reslove => require(['../views/after-sale/order-refund.vue'], reslove)
        },
        // 售后 - 退换货维修单
        {
          path: '/after-sale/order-return',
          name: '5-2',
          component: reslove => require(['../views/after-sale/order-return.vue'], reslove)
        },
        // 统计结算 - 提现申请
        {
          path: '/statistics/withdrawals',
          name: '6-1',
          component: reslove => require(['../views/statistics/withdrawals.vue'], reslove)
        },
        // 统计结算 - 店铺结算记录
        {
          path: '/statistics/settlement-log',
          name: '6-2',
          component: reslove => require(['../views/statistics/settlement-log.vue'], reslove)
        },
        // 统计结算 - 未结算订单
        {
          path: '/statistics/unsettled-order',
          name: '6-3',
          component: reslove => require(['../views/statistics/unsettled-order.vue'], reslove)
        },
        // 统计结算 - 店铺概况
        {
          path: '/statistics/shop-profile',
          name: '6-4',
          component: reslove => require(['../views/statistics/report-forms-order.vue'], reslove)
        },
        // 统计结算 - 运营报告
        {
          path: '/statistics/shop-operate',
          name: '6-5',
          component: reslove => require(['../views/statistics/report-forms-operate.vue'], reslove)
        },
        // 统计结算 - 销售排行
        {
          path: '/statistics/report-forms-selling',
          name: '6-6',
          component: reslove => require(['../views/statistics/report-forms-selling.vue'], reslove)
        },
        // 客服 - 客服设置
        {
          path: '/service/service-setting',
          name: '7-1',
          component: reslove => require(['../views/service/service-setting.vue'], reslove)
        },
        // 客服 - 店铺消息
        {
          path: '/service/message',
          name: '7-2',
          component: reslove => require(['../views/service/message.vue'], reslove)
        },
        // 账号 - 账号列表
        {
          path: '/account/admin',
          name: '8-1',
          component: reslove => require(['../views/account/admin.vue'], reslove)
        },
        // 账号 - 角色列表
        {
          path: '/account/role',
          name: '8-2',
          component: reslove => require(['../views/account/role-administrate.vue'], reslove)
        },
        // 账号 - 操作日志
        {
          path: '/account/oplog',
          name: '8-3',
          component: reslove => require(['../views/account/oplog.vue'], reslove)
        }
      ]
    },
  ]
})
