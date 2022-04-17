import Vue from 'vue'
import VueRouter from 'vue-router'
import discover from '../views/discover.vue'
import subNav from '@/components/subnav/sub-nav.vue'
// import song from '@/views/song/song.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'discover',
        components: {
            subnav: subNav,
            default: discover
        },

    },
    {
        name: 'song',
        path: '/song',
        components: {
            default: () =>
                import ('@/views/song/song.vue'),
            subnav: subNav,
        }
    },
    {
        name: 'playlist',
        path: '/playlist',
        components: {
            default: () =>
                import ('@/views/playList/playList.vue'),
            subnav: subNav,
        }
    },
    {
        name: 'search',
        path: '/search',
        components: {
            default: () =>
                import ('@/views/search/search.vue'),
        }
    },
    // {
    //     path: '*',
    //     redirect: { name: "discover" }
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router