import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonsView from '../views/PersonsView.vue'
import StatusesView from '@/views/StatusesView.vue'
import CarsView from '@/views/CarsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/persons',
      component: PersonsView
    },
    {
      path: '/statuses',
      component: StatusesView
    }, 
    {
      path: '/cars',
      component: CarsView
    },
    // {
    //   path: '/slots',
    //   component: SlotsView
    // }
  ]
})

export default router
