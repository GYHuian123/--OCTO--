import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home'),
          name: '小U商城'
        },
        {
          path: '/sort',
          component: () => import('@/views/sort'),
          name: '分类'
        },
        {
          path: '/mine',
          component: () => import('@/views/mine'),
          name: '我的'
        },
        {
          path: '/cart',
          component: () => import('@/views/cart'),
          name: '购物车'
        },
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '/register',
      component: () => import('@/pages/register'),
      name: '注册页'
    },
    {
      path: '/login',
      component: () => import('@/pages/login'),
      name: '登录页'
    },
    {
      path: '/goodslist',
      component: () => import('@/pages/goodslist'),
      name: '商品列表'
    },
    {
      path: '/goodsdetail',
      component: () => import('@/pages/goodsdetail'),
      name: '商品详情'
    },
    {
      path: '/order',
      component: () => import('@/pages/order'),
      name: '提交订单'
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
