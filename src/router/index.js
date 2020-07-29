import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import EditProfile from '../views/EditProfile.vue'
import Profile from '../views/Profile.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: (_to, _from, next) => {
            if (store.state.isAuthenticated)
                next('/dashboard');
            else
                next();
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: (_to, _from, next) => {
            if (store.state.isAuthenticated)
                next('/dashboard');
            else
                next();
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        props: true,
        beforeEnter: (_to, _from, next) => {
            if (store.state.isAuthenticated)
                next('/dashboard');
            else
                next();
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        props: true,
        beforeEnter: (_to, _from, next) => {
            if (store.state.isAuthenticated)
                next();
            else
                next('/login');
        }
    },
    {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfile,
        props: true,
        beforeEnter: (_to, _from, next) => {
            if (store.state.isAuthenticated)
                next();
            else
                next('/login');
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        props: true,
        beforeEnter: (_to, _from, next) => {
            if (store.state.isAuthenticated) {
                if (store.state.profile_built) {
                    next();
                } else {
                    next('/edit-profile');
                }
            } else
                next('/login');
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router