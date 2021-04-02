import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

//封装一个控制局部权限的函数
function hasUrl(url) {
  return store.getters.getUserInfo.menus_url.some(item => item == url)
}

Vue.use(Router)

export const RoutersList = [
  {
    path: '/menu',
    component: () => import('@/views/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('@/views/roler/roler'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path: '/manger',
    component: () => import('@/views/manger/manger'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manger') ? next() : next('/home')
    }
  },
  {
    path: '/cate',
    component: () => import('@/views/goodscate/cate'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/cate') ? next() : next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('@/views/goodsspecs/specs'),
    name: '商品规格管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path: '/goods',
    component: () => import('@/views/goods/goods'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() : next('/home')
    }
  },
  {
    path: '/member',
    component: () => import('@/views/member/member'),
    name: '会员列表',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() : next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('@/views/banner/banner'),
    name: '轮播图列表',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path: '/seck',
    component: () => import('@/views/seck/seck'),
    name: '活动列表',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() : next('/home')
    }
  },
]

let router = new Router({
  routes: [
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home')
        },
        ...RoutersList,
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

//全局导航守卫拦截之登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }
  if (store.getters.getUserInfo) {
    next()
    return
  }
  next('/login')
})

export default router
