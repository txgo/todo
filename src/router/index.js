import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../services/supabase'

// Lazy-loaded view components
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Signup = () => import('../views/Signup.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const ForgotPassword = () => import('../views/ForgotPassword.vue')
const ResetPassword = () => import('../views/ResetPassword.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication for protected routes
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const { data: { session } } = await supabase.auth.getSession()

  if (requiresAuth && !session) {
    next('/login')
  } else {
    next()
  }
})

export default router