import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Campaign from '../views/Campaign.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Campaign',
    component: Campaign,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
]

const router = new VueRouter({
  routes,
})

export default router
