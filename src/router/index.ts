import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import Home from '../views/Home.vue';

Vue.use(VueRouter);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#app',
});

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
