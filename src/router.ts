import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import Add from './views/Add.vue';
import PostPage from './views/PostPage.vue';

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/add',
            name: 'add',
            component: Add
        },
        {
            path: '/post/:id',
            name: 'post',
            component: PostPage
        }]
})
