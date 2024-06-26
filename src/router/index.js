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
    },
    {
      path: '/auth/profile',
      name: 'ProfileView',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: () => import('../views/ContactUsView.vue')
    },
  ]
})

export default router;
