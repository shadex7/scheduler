import { createRouter, createWebHashHistory } from 'vue-router'
import RegistrationUser from '../views/RegistrationUser'
import LoginUser from '../views/LoginUser'
import MainPage from '../views/MainPage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/reg',
    name: 'registr',
    component: RegistrationUser
  },
  {
    path: '/log',
    name: 'login',
    component: LoginUser,
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
