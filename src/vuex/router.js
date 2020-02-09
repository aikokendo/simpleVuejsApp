import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import createUser from '../views/createUser.vue'
import parser from '../views/parser.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {requiresAuth: true }
        },
        {   path: '/login',
            name: 'login',
            component: Login
        },
        {   path: '/createUser',
            name: 'createUser',
            component: createUser,
            meta: {requiresAuth: true}
        },
        {   path: '/parser',
            name: 'parser',
            component: parser,
            meta: {requiresAuth: true}
    }

    ]
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next('/')
    }
    next()
  })


export default router
