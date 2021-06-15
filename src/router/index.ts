import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "悦读-首页"
    }
  },
  {
    path: '/searchList/:title',
    name: 'searchList',
    component: () => import('../views/SearchList.vue'),
    beforeEnter: (to, from, next) => {
      to.meta.title = to.params.title
      // console.log(to.params.title)
    next()
  },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue') ,
    meta: {
      title: "悦读-登录"
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/register.vue'),
    meta: {
      title: "悦读-注册"
    }
  },
  {
    path: '/bookshelf',
    name: 'bookshelf',
    component: () => import( '../views/bookshelf.vue'),
    meta: {
      title: "悦读-书架"
    }
  },
  {
    path: '/cartoon',
    name: 'cartoon',
    component: () => import( '../views/cartoon.vue'),
    meta: {
      title: "悦读-漫画"
    }
  },
  {
    path: '/cartoon/detail',
    name: 'cartoondetail',
    component: () => import( '../views/cartoondetail.vue'),
    meta: {
      title: "悦读-漫画详情"
    }
  },
  {
    path: '/catagory',
    name: 'catagory',
    component: () => import( '../views/Category.vue'),
    meta: {
      title: "悦读-分类"
    }
  },
  {
    path: '/bookdetails/:title',
    name: 'bookdetails',
    component: () => import('../views/BookDetails.vue'),
    beforeEnter: (to, from, next) => {
      to.meta.title = to.params.title
      // console.log(to.params.title)
    next()
  },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
