// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ChannelView from '../views/Check.vue';
import LoginView from '../views/Login.vue';
import RegistView from '../views/Regist.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' }, 
    { path: '/home', name: 'home', component: HomeView },
    { path: '/check', name: 'check', component: ChannelView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/registrasi', name: 'registrasi', component: RegistView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
});


export default router;
