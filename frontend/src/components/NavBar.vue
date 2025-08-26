<template>
  <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    <div
      class="flex items-center space-x-8 px-8 py-4 rounded-2xl bg-neutral-800/60 border border-cyan-700/30 backdrop-blur-lg text-white shadow-xl shadow-neutral-900/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
    >
      <router-link to="/" class="flex items-center space-x-4 hover:cursor-pointer group">
        <div class="relative">
          <img src="/nexttrack-logo.svg" alt="Logo" class="h-10 w-11 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </router-link>

      <router-link to="/recommend" :class="updateLinkClass('/recommend')" class="relative px-3 py-2 rounded-lg transition-all duration-300 font-poppins font-normal">Recommend</router-link>
      <router-link to="/search" :class="updateLinkClass('/search')" class="relative px-3 py-2 rounded-lg transition-all duration-300 font-poppins font-normal">Search</router-link>
      <router-link to="/playlists" :class="updateLinkClass('/playlists')" class="relative px-3 py-2 rounded-lg transition-all duration-300 font-poppins font-normal">Playlists</router-link>
      <router-link to="/docs" :class="updateLinkClass('/docs')" class="relative px-3 py-2 rounded-lg transition-all duration-300 font-poppins font-normal">Docs</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

function updateLinkClass(path) {
  return [
    route.path === path 
      ? "text-cyan-400 bg-cyan-500/20 border border-cyan-500/30" 
      : "text-neutral-300 hover:text-cyan-300 hover:bg-neutral-700/50",
  ];
}
</script>
