import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'
import Summary from '@/components/Summary'
import Search from '@/components/Search'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Start',
            component: Start
        },
        {
            path: '/auth/login',
            name: 'login',
            component: Login,

        },
        {
            path: '/auth/register',
            name: 'register',
            component: Register,
            // meta: {
            //     guest: true
            // }
        },
        {
            path: '/dashboard',
            name: 'userboard',
            component: UserBoard,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: '/summary',
            name: 'summary',
            component: Summary,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            // meta: {
            //     requiresAuth: true,
            //     is_admin : true
            // }
        },
        //{ path: '*', redirect: '/'},
        { path: '/search', name: 'search', component: Search },
    ]
})

// route based on meta specification
router.beforeEach((to, from, next) => {
    // if(to.matched.some(record => record.meta.requiresAuth)) {
    //     if (localStorage.getItem('jwt') == null) {
    //         next({
    //             path: '/login',
    //             params: { nextUrl: to.fullPath }
    //         })
    //     } else {
    //         let user = JSON.parse(localStorage.getItem('user'))
    //         if(to.matched.some(record => record.meta.is_admin)) {
    //             if(user.is_admin == 1){
    //                 next()
    //             }
    //             else{
    //                 next({ name: 'userboard'})
    //             }
    //         }else {
    //             next()
    //         }
    //     }
    // } else if(to.matched.some(record => record.meta.guest)) {
    //     if(localStorage.getItem('jwt') == null){
    //         next()
    //     }
    //     else{
    //         next({ name: 'userboard'})
    //     }
    // }else {
    //     next()
    // }
    const publicPages = ['/','/auth/login','/auth/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if(authRequired && !loggedIn) {
       return next('/');
    }

    next();
})

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
