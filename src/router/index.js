import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/LogInView.vue')
    // },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue')
    },
    {
      path: '/movies/:id',
      name: 'MovieDetail',
      component: () => import('../views/MovieDetail.vue')
    },
    {
      path: '/movies/list/:film_type',
      name: 'ListFilmsView',
      component: () => import('../views/ListFilmsView.vue')
    },
    {
      path: '/movie/search/:search',
      name: 'Search',
      component: () => import('../views/SearchViewFilms.vue')
    }
  ]
})

export default router;
