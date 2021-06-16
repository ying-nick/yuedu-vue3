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
      title: "悦读-首页"
    }
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../views/RankingList.vue'),
    meta: {
      title: "悦读-排行榜"
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
    path: '/cartoon/detail/:id',
    name: 'cartoondetail',
    props:true,
    component: () => import( '../views/cartoondetail.vue'),
    meta: {
      title: "悦读-漫画详情"
    }
  },
  {
    path: '/cartoon/detail/:id/:chapterid/:title',
    name: 'cartoondetailread',
    props:true,
    component: () => import( '../views/cartoonread.vue'),
    meta: {
      title: "悦读-漫画内容"
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
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
  },
  {
    path: '/content',
    name: 'content',
    component: () => import( '../views/BookContent.vue'),
    meta: {
      title: "悦读-目录"
    }
  },
  {
    path: '/chapter',
    name: 'chapter',
    component: () => import( '../views/BookChapter.vue'),
    meta: {
      title: "悦读-内容"
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
