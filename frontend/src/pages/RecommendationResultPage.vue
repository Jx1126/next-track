<template>
  <div class="relative z-10 min-h-screen">
    <div class="container mx-auto px-6 py-12 max-w-4xl">
      
      <div v-if="!loading" class="space-y-8">
        
        <!-- selected playlist card -->
        <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold font-poppins text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide">Source Playlist</h2>
            <router-link 
              to="/recommend" 
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600/50 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-colors duration-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
              <span class="text-neutral-400 group-hover:text-cyan-400 transition-colors duration-300 font-medium">New Search</span>
            </router-link>
          </div>
          
          <!-- playlist info -->
          <div class="bg-gradient-to-r from-neutral-800/40 to-neutral-700/40 border border-neutral-600/40 rounded-xl p-4">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-cyan-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg text-neutral-200 mb-1">{{ playlist.name }}</h3>
                <p class="text-neutral-400 text-sm">{{ playlist.description || "No description provided." }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-6 text-sm font-poppins">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/50"></div>
                <span class="text-cyan-400 font-semibold">{{ playlist.added_tracks_count }}</span>
                <span class="text-neutral-400">{{ playlist.added_tracks_count === 1 ? 'track' : 'tracks' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></div>
                <span class="text-neutral-400">Updated:</span>
                <span class="text-neutral-300 font-medium">{{ formatDate(playlist.last_updated) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- recommendation result card -->
        <div v-if="!embed_loading" class="bg-gradient-to-r from-neutral-800/40 to-neutral-700/40 border border-neutral-600/40 rounded-2xl p-8 w-full flex flex-col items-center gap-5 backdrop-blur-lg transition-all duration-300">
          <h2 class="text-lg text-neutral-400 font-semibold tracking-wide">Your Recommended Track is</h2>
          <div class="flex flex-col items-center gap-1">
            <div class="relative">
              <h1 class="text-2xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10">{{ recommended_track.title }}</h1>
              <!-- Subtle glow effect behind title -->
              <div class="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 scale-110 -z-10"></div>
            </div>
            <h2 class="text-lg text-neutral-400">by <span class="font-semibold text-neutral-300">{{ recommended_track.artist }}</span></h2>
          </div>
          
          <!-- enhanced recommendation information -->
          <div class="flex flex-col items-center gap-2 mt-2 mb-2">
            <div class="flex flex-wrap justify-center gap-3 text-sm">
              <div class="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 px-5 py-3 rounded-2xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span class="text-cyan-300 font-semibold">{{ getAlgorithmDisplayName(algorithm) }}</span>
                </div>
              </div>
              
              <div v-if="recommended_track.similarity_score" class="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-emerald-300 font-semibold">{{ (recommended_track.similarity_score * 100).toFixed(1) }}% Match</span>
                </div>
              </div>
            </div>
            <p v-if="recommended_track.explanation" class="text-neutral-500 text-sm text-center max-w-md">
              {{ recommended_track.explanation }}
            </p>
          </div>

          <!-- technical details section -->
          <TechnicalDetails 
            :recommended-track="recommended_track" 
            :algorithm="algorithm" 
          />

          <iframe
            v-if="recommended_track.youtube_link" 
            :src="formatYoutubeLink(recommended_track.youtube_link)"
            frameborder="0"
            allowfullscreen
            class="w-full h-96 rounded-lg shadow-lg mt-4 border-2 border-neutral-700"
          ></iframe>
          <p v-else>Sorry, no YouTube embed available for this track.</p>

          <button
            @click="regenerateRecommendation"
            class="relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 transition-all duration-300 group text-neutral-200 hover:text-white font-semibold shadow-lg hover:shadow-cyan-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span>Regenerate</span>
          </button>
        </div>

        <!-- loading state for embed -->
        <LoadingSpinner v-else class="mt-8" />
      </div>

      <!-- main loading state -->
      <LoadingSpinner v-if="loading" class="mt-8" />
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import TechnicalDetails from '../components/TechnicalDetails.vue';
import { createToast } from '../stores/toastStore.js';
import { getPlaylistById } from '../stores/playlistStore.js';

export default {
  components: {
    LoadingSpinner,
    TechnicalDetails,
  },
  data() {
    return {
      loading: true,
      embed_loading: false,
      playlist: {},
      recommended_track: {},
      algorithm: 'hybrid',
    };
  },
  async mounted() {
    const playlist_id = this.$route.params.id;
    const playlist = getPlaylistById(playlist_id);
    
    // get algorithm from query parameters
    this.algorithm = this.$route.query.algorithm || 'hybrid';

    try {
      // get recommendation results from the API
      const res = await fetch(`/api/music/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          playlist,
          algorithm: this.algorithm
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch recommendation');
      }

      const data = await res.json();
      
      this.playlist = data.playlist || {}; // playlist details
      this.recommended_track = data.recommended_track || {}; // recommended track details
      
      // update algorithm with the actual algorithm used
      this.algorithm = data.algorithm_used || data.recommended_track?.algorithm_used || this.algorithm;
      
    } catch (error) {
      console.error('API call failed:', error);
      createToast('Failed to load recommendation results: ' + error.message, 'error');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(dateInput) {
      if (!dateInput) return 'Unknown';
      
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return 'Unknown';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    formatYoutubeLink(link) {
      if (!link) return '';
      // convert youtube watch links to embed links
      return link.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/');
    },

    getAlgorithmDisplayName(algorithm) {
      const names = {
        hybrid: 'Smart Mix',
        artist_based: 'Similar Artists',
        tag_based: 'Tag Explorer',
        temporal: 'Era Discovery',
        length_based: 'Duration Match',
        random: 'Surprise Me'
      };
      return names[algorithm] || 'Unknown';
    },

    async regenerateRecommendation() {
      try {
        this.loading = true;
        
        // use the same API endpoint
        const response = await fetch(`/api/music/recommend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            playlist: {
              id: this.playlist.id,
              name: this.playlist.name,
              description: this.playlist.description,
              tracks: this.playlist.tracks || [], // Make sure tracks are included
              added_tracks_count: this.playlist.added_tracks_count,
              last_updated: this.playlist.last_updated
            },
            algorithm: this.algorithm
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to get recommendation: ${response.status}`);
        }

        const data = await response.json();
        
        this.recommended_track = data.recommended_track || {};
        
        createToast('New recommendation generated!', 'success');
      } catch (error) {
        console.error('Error regenerating recommendation:', error);
        createToast('Failed to regenerate recommendation. Please try again.', 'error');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-move 2.5s ease-in-out infinite;
}
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>