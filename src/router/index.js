import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Home from '@/views/home'
import GoBang from '@/views/gobang'
import Sokoban from '@/views/sokoban'
import Page2048 from '@/views/2048'
import Card from '@/views/card'

const router = new Router({
    routes: [
        {
            path: '',
            redirect: '/Home'
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home
        },
        {
            path: '/GoBang',
            name: 'GoBang',
            component: GoBang
        },
        {
            path: '/Sokoban',
            name: 'Sokoban',
            component: Sokoban
        },
        {
            path: '/Page2048',
            name: 'Page2048',
            component: Page2048
        },
        {
            path: '/Card',
            name: 'Card',
            component: Card
        }

    ]
})

export default router;