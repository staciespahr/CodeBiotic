import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../components/_home-page.vue'
import AboutView from '../components/_about-page.vue'
import HelpView from '../components/_help-page.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutView },
    { path: '/help', component: HelpView }
  ]
})

export default router