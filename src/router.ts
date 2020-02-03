import Vue from 'vue'
import Router from 'vue-router'
import NcovMap from './views/Map.vue';
import Broadcast from './views/Broadcast.vue';
import Rumour from './views/Rumour.vue';

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'map',
            component: NcovMap,
        },
        {
            path: '/broadcast',
            name: 'broadcast',
            component: Broadcast
        },{
            path: '/rumour',
            name: 'rumour',
            component: Rumour
        }]
})
