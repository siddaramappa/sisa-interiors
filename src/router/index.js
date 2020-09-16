import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import CarDetails from '@/components/CarDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/details/:Cid',
      name: 'details',
      component: CarDetails
    }
  ]
})
