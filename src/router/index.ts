import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/Registration.vue'),
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('../views/Transactions.vue'),
  },
  {
    path: '/tasks',
    name: 'tasks',
  },
  {
    path: '/statistics',
    name: 'statistics',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
