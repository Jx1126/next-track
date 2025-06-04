import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/SearchPage.vue';
import SearchResultsPage from '../pages/SearchResultsPage.vue';

const routes = [
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
    {
    path: '/results',
    name: 'SearchResults',
    component: SearchResultsPage,

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;