import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/SearchPage.vue';

const routes = [
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;