import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/users',
    name: 'users',
    component: () => import('../view/UsersView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
