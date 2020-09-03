import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import firebase from 'firebase'
import BeerComponent from '../components/BeerComponent'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      login: true
    }
  },
  {
    path: '/beer/:id',
    name: 'BeerComponent',
    component: BeerComponent,
    meta: {
      login: true
    }
  },
  { path: '/', redirect: '/login' },
  { path: '/*', redirect: '/login' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  let authRequired = to.matched.some(route => route.meta.login)
  if (!user && authRequired) {
    next('/')
  }else{
    next()
  }
})

export default router
