import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import FormView from '../views/FormView.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminView
    },
    {
      path: '/form/:id',
      name: 'form',
      component: FormView
    }
  ]
})

export default router
