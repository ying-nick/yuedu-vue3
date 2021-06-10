import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/header.vue'
import Content from '../views/Content.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component:Home 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue')
  },
  {
    path: '/content',
    name: 'content',
    component:Content
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
