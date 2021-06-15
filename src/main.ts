import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import 'lib-flexible'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

declare var document: any;
router.beforeResolve((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

const app = createApp(App)

app.use(ElementPlus,{locale}).use(store).use(router).mount('#app')
