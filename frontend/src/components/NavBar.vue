<template>
  <nav class="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
    <div
      class="flex items-center space-x-8 px-6 py-3 rounded-full bg-neutral-800/50 border border-white/10 backdrop-blur-md text-white shadow-md shadow-neutral-900/20"
    >
      <router-link to="/" class="flex items-center space-x-4 hover:cursor-pointer">
        <img src="/nexttrack-logo.svg" alt="Logo" class="h-9 w-10" />
      </router-link>

      <router-link to="/recommend" :class="updateLinkClass('/recommend')">Recommend</router-link>
      <router-link to="/search" :class="updateLinkClass('/search')">Search</router-link>
      <router-link to="/playlist" :class="updateLinkClass('/playlist')">Playlist</router-link>
      <router-link to="/docs" :class="updateLinkClass('/docs')">Docs</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

function updateLinkClass(path) {
  return [
    "transition ease-in-out duration-200",
    route.path === path ? "text-cyan-400 font-semibold" : "hover:text-neutral-400",
  ];
}
</script>
