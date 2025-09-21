import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultsPage from "../pages/SearchResultsPage.vue";
import PlaylistsPage from "../pages/PlaylistsPage.vue";
import PlaylistDetailsPage from "../pages/PlaylistDetailsPage.vue";
import RecommendationPage from "../pages/RecommendationPage.vue";
import RecommendationResultPage from "../pages/RecommendationResultPage.vue";
import DocumentationPage from "../pages/DocumentationPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPage,
  },
  {
    path: "/results",
    name: "SearchResults",
    component: SearchResultsPage,
  },
  {
    path: "/playlists",
    name: "Playlists",
    component: PlaylistsPage,
  },
  {
    path: "/playlist",
    name: "PlaylistDetails",
    component: PlaylistDetailsPage,
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: RecommendationPage,
  },
  {
    path: "/recommend/:id/result",
    name: "RecommendationResult",
    component: RecommendationResultPage,
  },
  {
    path: "/docs",
    name: "Documentation",
    component: DocumentationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
