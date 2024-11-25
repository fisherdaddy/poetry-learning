import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Level from '../views/Level.vue'
import PoemDetail from '../views/PoemDetail.vue'
import { trackPageView } from '../utils/analytics'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/level/:id',
      name: 'level',
      component: Level
    },
    {
      path: '/poem/:id',
      name: 'poem',
      component: PoemDetail
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// 添加路由跟踪
router.afterEach((to) => {
  trackPageView(to.fullPath)
})

export default router
