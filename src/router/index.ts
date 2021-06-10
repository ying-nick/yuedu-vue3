import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
<<<<<<< HEAD
import Home from '../components/header.vue'
import Content from '../views/Content.vue'
=======
import Home from '@/views/Home.vue'

>>>>>>> cc94ea17ddfc6dd93c615fb7087824668721f132
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
<<<<<<< HEAD
    component:Home 
=======
    component: Home
>>>>>>> cc94ea17ddfc6dd93c615fb7087824668721f132
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
