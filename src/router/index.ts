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
    path: '/2',
    name: '2',
    component:  () => import('../views/2.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue')
  },
  {
    path: '/detail',
    name: 'detail',
<<<<<<< HEAD
    component: () => import('../views/Detail.vue'),
    children: [
     { path: "1",
      component: () => import('../views/1.vue')}
    ]
=======
    component: () => import( '../views/Detail.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/register.vue')
>>>>>>> xuning
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
