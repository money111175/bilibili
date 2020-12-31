import Vue from 'vue'
import Router from 'vue-router'
import register from '../views/register'
import Login from '../views/Login.vue'
import userinfo from '../views/userinfo'
import edit from '../views/edit'
import Home from '../views/Home'
import article from '../views/Article'

Vue.use(Router)

const routes = [{
        path: '/',
        component: Home,
        meta: {
            keepalive: true
        }

    }, {
        path: '/register',
        component: register
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/userinfo',
        component: userinfo,
        meta: {
            istoken: true
        }
    },
    {
        path: '/edit',
        component: edit,
        meta: {
            istoken: true
        }
    }, {
        path: '/article/:id',
        component: article,
    }
]



const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(to);
    if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
        router.push('/login')
        Vue.prototype.$msg.fail('请重新登录')
        return
    }
    next()
})

export default router