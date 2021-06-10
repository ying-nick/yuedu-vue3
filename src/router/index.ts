import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:"/", name:"base",redirect:{name:'Home'}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/searchList',
    name: 'searchList',
    component:  () => import('../views/SearchList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    children: [
     { path: "1",
      component: () => import('../views/1.vue')}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
