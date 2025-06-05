import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/SearchPage.vue';
import SearchResultsPage from '../pages/SearchResultsPage.vue';
import PlaylistsPage from '../pages/PlaylistsPage.vue';
import PlaylistDetailsPage from '../pages/PlaylistDetailsPage.vue';

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
    name: 'Playlists',
    component: PlaylistsPage,
  },
  {
    path: '/playlist/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetailsPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;