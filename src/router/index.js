import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Level from '../views/Level.vue'
import PoemDetail from '../views/PoemDetail.vue'
import TangshiList from '../views/TangshiList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/level/:id',
      name: 'Level',
      component: Level
    },
    {
      path: '/poem/:id',
      name: 'PoemDetail',
      component: PoemDetail
    },
    {
      path: '/tangshi',
      name: 'Tangshi',
      component: TangshiList
    },
    {
      path: '/songci',
      name: 'SongciList',
      component: () => import('../views/TangshiList.vue')
    },
    {
      path: '/yuanqu',
      name: 'YuanquList',
      component: () => import('../views/TangshiList.vue')
    },
    {
      path: '/shijing',
      name: 'ShijingList',
      component: () => import('../views/TangshiList.vue')
    },
    {
      path: '/lunyu',
      name: 'LunyuList',
      component: () => import('../views/TangshiList.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
