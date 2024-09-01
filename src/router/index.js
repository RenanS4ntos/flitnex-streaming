import { createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/movies', name: 'movies', component: Home },
  { path: '/series', name: 'series', component: Home },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: import('../pages/NotFound.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
