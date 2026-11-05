import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../_home-page.vue'
import ApplicationPage from '../components/application/_application-page.vue'
import ButtonsPage from '../components/buttons/_buttons-page.vue'
import TablesPage from '../components/tables/_table-page.vue'
import WCAGGuidelinesPage from '../components/wcag-guidelines/_wcag-guidelines-page.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/application',
    name: 'Application',
    component: ApplicationPage
  },
  {
    path: '/buttons',
    name: 'Buttons',
    component: ButtonsPage
  },
  {
    path: '/tables',
    name: 'Tables',
    component: TablesPage
  },
  {
    path: '/wcag-guidelines',
    name: 'WCAG Guidelines',
    component: WCAGGuidelinesPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router