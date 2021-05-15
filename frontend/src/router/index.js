import Vue from 'vue'
import EditDevops from '@/components/EditDevops'
import Home from '@/components/Home'
import Systeminfos from '@/components/Systeminfos'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const  routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/editdevops',
      name: 'EditDevops',
      component: EditDevops
    },
    {
      path: '/systeminfos',
      name: 'Systeminfos',
      component: Systeminfos
    }
  ]

  const router = new VueRouter({
    mode: 'history',
    routes
})

export default router