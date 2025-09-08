<template>
  <div class="fixed inset-0 bg-neutral-900/30 backdrop-blur-xl pointer-events-none z-0"></div>
  
  <div class="relative z-10 min-h-screen">
    <!-- progress steps -->
    <div class="px-6 pt-8 pb-12">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-center justify-center gap-3 md:gap-6">
          <div class="flex items-center gap-2">

            <!-- progress step 1 -->
            <div
              :class="['w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300', 
              !confirmed_playlist_selection ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400 text-white' : 
              'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400 text-white']"
            >
              <svg v-if="!confirmed_playlist_selection" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span :class="['font-poppins font-medium text-sm', !confirmed_playlist_selection ? 'text-cyan-400' : 'text-emerald-400']">
              Select Playlist
            </span>
          </div>

          <!-- divider -->
          <div :class="['h-0.5 w-12 md:w-16 transition-all duration-500', confirmed_playlist_selection ? 'bg-gradient-to-r from-emerald-400 to-cyan-400' : 'bg-neutral-700']"></div>

          <!-- progress step 2 -->
          <div class="flex items-center gap-2">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300', 
                         confirmed_playlist_selection ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400 text-white' : 
                         'bg-neutral-800 border-neutral-600 text-neutral-400']">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <span :class="['font-poppins font-medium text-sm', confirmed_playlist_selection ? 'text-cyan-400' : 'text-neutral-400']">
              Choose Algorithm
            </span>
          </div>

          <!-- divider -->
          <div class="h-0.5 w-12 md:w-16 bg-neutral-700 transition-all duration-500"></div>

          <!-- progress step 3 -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center border-2 bg-neutral-800 border-neutral-600 text-neutral-400 transition-all duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <span class="font-poppins font-medium text-sm text-neutral-400">Get Results</span>
          </div>
        </div>
      </div>
    </div>

    <!-- playlist selection section -->
    <div :class="confirmed_playlist_selection ? 'flex flex-col items-center px-6 py-4' : 'flex flex-col justify-center items-center px-6'">
      <div class="flex flex-col items-center space-y-8 w-full max-w-4xl px-6">
        <!-- show selected playlist or selection button -->
        <div v-if="!confirmed_playlist_selection" class="flex flex-col items-center space-y-12 text-center">
          <!-- hero section -->
          <div class="space-y-6">
            <div class="space-y-4">
              <h1 class="text-4xl md:text-5xl font-bold font-poppins text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide">Get Track Recommendations</h1>
              <p class="text-neutral-400 text-lg md:text-xl font-poppins font-light max-w-2xl mx-auto">Discover your next favorite song with our advanced recommendation algorithms</p>
            </div>
            
            <!-- feature highlights -->
            <div class="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-xl p-6 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-neutral-200 mb-2 font-poppins">Smart Algorithms</h3>
                <p class="text-neutral-400 text-sm font-poppins">6 different recommendation algorithms with academic foundations</p>
              </div>
              
              <div class="bg-neutral-900/60 backdrop-blur-lg border border-emerald-700/30 rounded-xl p-6 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-neutral-200 mb-2 font-poppins">Playlist Based</h3>
                <p class="text-neutral-400 text-sm font-poppins">Personalized recommendations based on your curated playlists</p>
              </div>
              
              <div class="bg-neutral-900/60 backdrop-blur-lg border border-purple-700/30 rounded-xl p-6 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-neutral-200 mb-2 font-poppins">Instant Discovery</h3>
                <p class="text-neutral-400 text-sm font-poppins">Get YouTube links and detailed track information instantly</p>
              </div>
            </div>
          </div>

          <!-- call to action -->
          <div class="space-y-6">
            <button
              @click="openPlaylistModal"
              class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold font-poppins px-12 py-5 rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 ease-out group relative overflow-hidden text-lg"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
                Select Your Playlist
              </div>
            </button>
            
            <p class="text-neutral-500 text-sm font-poppins">
              Don't have a playlist yet? 
              <router-link to="/playlists" class="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium underline decoration-cyan-400/30 hover:decoration-cyan-300">
                Create one here
              </router-link>
            </p>
          </div>
        </div>

        <!-- playlist & algorithm selection -->
        <div v-else class="flex flex-col space-y-6 w-full items-center">
          <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-8 w-full shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
            <!-- playlist section -->
            <div class="mb-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold font-poppins text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide">Selected Playlist</h2>
                <button
                  @click="openPlaylistModal"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600/50 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/50 transition-all duration-300 group/btn text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-neutral-400 group-hover/btn:text-cyan-400 transition-colors duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span class="text-neutral-400 group-hover/btn:text-cyan-400 transition-colors duration-300 font-medium">Change</span>
                </button>
              </div>
              
              <!-- playlist card -->
              <div class="bg-gradient-to-r from-neutral-800/40 to-neutral-700/40 border border-neutral-600/40 rounded-xl p-4">
                <div class="flex items-center gap-4 mb-3">
                  <div class="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-cyan-400">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-lg text-neutral-200 mb-1">{{ confirmed_playlist_selection.name }}</h3>
                    <p class="text-neutral-400 text-sm">{{ confirmed_playlist_selection.description || "No description provided." }}</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-6 text-sm font-poppins">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span class="text-cyan-400 font-semibold">{{ confirmed_playlist_selection.added_tracks_count }}</span>
                    <span class="text-neutral-400">{{ confirmed_playlist_selection.added_tracks_count === 1 ? 'track' : 'tracks' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span class="text-neutral-400">Updated:</span>
                    <span class="text-neutral-300 font-medium">{{ formatDate(confirmed_playlist_selection.last_updated) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- divider -->
            <div class="flex items-center gap-4 mb-8">
              <div class="flex-1 border-t border-neutral-700/50"></div>
              <div class="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div class="flex-1 border-t border-neutral-700/50"></div>
            </div>

            <!-- algorithm section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide mb-6 font-poppins">
                Choose Recommendation Algorithm
              </h3>
              
              <AlgorithmSelector v-model="selectedAlgorithm" />
            </div>

            <!-- submit button -->
            <div class="flex justify-center pt-2">
              <button
                @click="goToResultsPage"
                class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold font-poppins px-16 py-5 rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 ease-out group relative overflow-hidden text-lg"
                :disabled="!selectedAlgorithm"
                :class="!selectedAlgorithm ? 'opacity-50 cursor-not-allowed' : ''"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="relative flex items-center gap-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Generate Recommendations
                </div>
              </button>
            </div>
          </div>
        </div>

    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" class="mt-8" />
  </div>
  </div>

  <!-- playlist selection modal -->
  <ConfirmationModal
    :visible="modalVisible"
    title="Select Playlist"
    description="Choose a playlist to get personalised track recommendations."
    :custom_contents="true"
    confirm_button_text="Select"
    @confirm="confirmPlaylistSelection"
    @cancel="modalVisible = false"
  >
    <div v-if="playlists.length" class="space-y-3">
      <div class="space-y-3 max-h-60 overflow-y-auto">
        <button
          v-for="playlist in playlists"
          :key="playlist.id"
          @click="selectPlaylist(playlist.id)"
          :class="[
            'group w-full text-left px-4 py-4 rounded-xl border transition-all duration-300 ease-out font-medium font-poppins relative overflow-hidden',
            selected_playlist_id === playlist.id 
              ? 'border-cyan-400/60 bg-gradient-to-r from-cyan-900/30 to-blue-900/20 text-cyan-200 shadow-lg shadow-cyan-400/20' 
              : 'border-neutral-700/50 bg-neutral-800/60 text-neutral-300 hover:border-cyan-500/40 hover:bg-neutral-700/60 hover:text-cyan-300'
          ]"
        >
          <!-- selected glow effect -->
          <div v-if="selected_playlist_id === playlist.id" 
               class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl"></div>
          
          <!-- content -->
          <div class="relative flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <div class="font-bold text-base mb-2 truncate">{{ playlist.name }}</div>
              <div class="text-sm opacity-75 mb-2 line-clamp-2">
                {{ playlist.description || "No description provided" }}
              </div>
              <div class="flex items-center gap-4 text-xs">
                <div class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                  </svg>
                  <span>{{ playlist.added_tracks_count }} {{ playlist.added_tracks_count === 1 ? 'track' : 'tracks' }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>{{ formatDate(playlist.last_updated) }}</span>
                </div>
              </div>
            </div>
            
            <!-- selection indicator -->
            <div v-if="selected_playlist_id === playlist.id" 
                 class="flex-shrink-0 ml-3">
              <div class="w-8 h-8 bg-cyan-400/20 border border-cyan-400/40 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
    
    <!-- no playlists message -->
    <div v-else class="text-neutral-400">
      <div class="flex flex-col">
        <span>No playlists created yet.</span>
        <span>
          Create a new playlist
          <router-link to="/playlist" class="underline font-semibold text-neutral-300 transition ease-in-out hover:text-neutral-400">here</router-link>.
        </span>
      </div>
    </div>
  </ConfirmationModal>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import AlgorithmSelector from '../components/AlgorithmSelector.vue';
import { createToast } from '../stores/toastStore.js';
import { getPlaylists } from '../stores/playlistStore.js';

export default {
  components: {
    LoadingSpinner,
    ConfirmationModal,
    AlgorithmSelector,
  },
  data() {
    return {
      confirmed_playlist_selection: false,
      selectedAlgorithm: 'hybrid',
      playlists: [],
      modalVisible: false,
      selected_playlist_id: null,
      loading: false
    };
  },
  methods: {
    // format date to make it readable
    formatDate(dateInput) {
      const date = new Date(dateInput);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,

      });
    },
    // open playlist selection modal
    async openPlaylistModal() {
      try {
        this.playlists = getPlaylists(); // fetch playlists from the store
      } catch (error) {
        createToast('Error fetching playlists: ' + error.message, 'error');
        this.playlists = [];
      }

      this.selected_playlist_id = this.confirmed_playlist_selection?.id || false;
      this.modalVisible = true; // show the modal
    },
    // select a playlist
    selectPlaylist(playlistId) {
      this.selected_playlist_id = playlistId;
    },
    // confirm playlist selection
    confirmPlaylistSelection() {
      // validation: a playlist must be selected
      if (!this.selected_playlist_id) {
        createToast('Please select a playlist', 'error');
        return;
      }
      const selected = this.playlists.find(p => String(p.id) === String(this.selected_playlist_id)); // find the selected playlist

      // validation: selected playlist must exist
      if (selected) {
        this.confirmed_playlist_selection = selected; // set the confirmed selection
        this.modalVisible = false; // close the modal
        this.selected_playlist_id = null; // reset selected playlist id
      } else {
        createToast('Selected playlist not found', 'error');
        return;
      }
    },
    goToResultsPage() {
      if (!this.confirmed_playlist_selection) {
        createToast('Please select a playlist first', 'error');
        return;
      }
      // navigate to the results page with the selected playlist id and algorithm
      this.$router.push({
        name: 'RecommendationResult',
        params: {
          id: this.confirmed_playlist_selection.id,
        },
        query: {
          algorithm: this.selectedAlgorithm
        }
      });
    },
  },
};
</script>
