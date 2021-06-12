import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:"/", name:"base",redirect:{name:'Home'}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: '/searchList/:title',
    name: 'searchList',
    component: () => import('../views/SearchList.vue'),
    meta: {
      title: "搜索"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue') ,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      title: "书籍分类"
    }
  },
  {
    path: '/bookdetails/:title',
    name: 'bookdetails',
    component: () => import('../views/BookDetails.vue'),
    meta: {
      title: "书籍详情"
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
