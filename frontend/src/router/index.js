import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/SearchPage.vue';
import SearchResultsPage from '../pages/SearchResultsPage.vue';
import PlaylistPage from '../pages/PlaylistPage.vue';
import RecommendationPage from '../pages/RecommendationPage.vue';
import RecommendationResultPage from '../pages/RecommendationResultPage.vue';

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
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: PlaylistPage,
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: RecommendationPage,
  },
  {
    path: '/recommend/:id/result',
    name: 'RecommendationResult',
    component: RecommendationResultPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;