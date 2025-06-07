<template>
  <div class="flex justify-center items-center flex-col h-screen transform -translate-y-[120px]">    
    <!-- playlist selection section -->
    <div class="flex flex-col items-center space-y-6 w-full max-w-3xl">
      <!-- show selected playlist or selection button -->
      <div v-if="!confirmed_playlist_selection" class="flex flex-col items-center space-y-6">
        <h1 class="text-2xl font-bold text-neutral-300 mb-3">Get Track Recommendations</h1>
        <p class="text-neutral-400 text-center">Select a playlist to get personalised recommendations</p>
        <button
          @click="openPlaylistModal"
          class="bg-neutral-300 text-neutral-900 font-semibold px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-400 transition ease-in-out"
        >
          Select Playlist
        </button>
      </div>
      
      <!-- selected playlist display -->
      <div v-else class="flex flex-col space-y-4 w-full items-center">
        <h2 class="text-lg font-semibold text-neutral-300">Selected Playlist</h2>
        <div class="bg-neutral-900 border border-neutral-700 rounded-xl p-4 w-full">
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col max-w-3/5">
              <h2 class="font-semibold text-lg text-neutral-300 mb-2">{{ confirmed_playlist_selection.name }}</h2>
              <p class="text-neutral-400 line-clamp-1">{{ confirmed_playlist_selection.description || "No Description." }}</p>
            </div>
            <div class="flex flex-row gap-10">
              <div class="flex flex-col items-center">
                <p class="text-neutral-500">Tracks</p>
                <h2 class="text-neutral-400 font-lg font-semibold">{{ confirmed_playlist_selection.added_tracks_count }}</h2>
              </div>
              <div class="flex flex-col items-center">
                <p class="text-neutral-500">Last Updated</p>
                <h2 class="text-neutral-400 font-lg">{{ formatDate(confirmed_playlist_selection.last_updated) }}</h2>
              </div>
              <button
                @click="openPlaylistModal"
                class="border-3 border-neutral-700 rounded-lg px-3 py-3 bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:cursor-pointer transition ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- preferences input section -->
      <div v-if="confirmed_playlist_selection" class="flex flex-col space-y-4 w-full justify-center items-center">
        <div class="flex flex-col gap-2 w-full">
          <label for="preferences" class="text-neutral-400 pl-1">Preferences (Optional)</label>
          <input
            v-model="preferences"
            id="preferences"
            type="text"
            placeholder="Enter your music preferences..."
            class="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition ease-in-out"
          />
        </div>
        
        <!-- recommend button -->
        <button
          @click="goToResultsPage"
          class="bg-neutral-200 text-neutral-900 max-w-2xs transition font-semibold px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-300 ease-in-out"
        >
          Get Recommendation
        </button>
      </div>
    </div>
    
    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" class="mt-8" />
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
    <div v-if="playlists.length" class="space-y-2">
      <div class="space-y-2 max-h-60 overflow-y-auto">
        <button
          v-for="playlist in playlists"
          :key="playlist.id"
          @click="selectPlaylist(playlist.id)"
          :class="[
            'text-neutral-300 font-semibold px-4 py-3 rounded-lg w-full text-left border transition ease-in-out',
            selected_playlist_id === playlist.id ? 'border-cyan-700 bg-cyan-900/20' : 'border-neutral-700 bg-neutral-800'
          ]"
        >
          <div class="flex flex-col gap-1">
            <span class="font-semibold">{{ playlist.name }}</span>
            <span class="text-neutral-500 line-clamp-2">{{ playlist.description || 'No Description' }}</span>
            <span class="text-neutral-400">{{ playlist.added_tracks_count }} track(s)</span>
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
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import { createToast } from '../stores/toastStore.js';

export default {
  components: {
    LoadingSpinner,
    ConfirmationModal,
  },
  data() {
    return {
      confirmed_playlist_selection: false,
      preferences: '',
      playlists: [],
      modalVisible: false,
      selected_playlist_id: null,
      loading: false,
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
        // fetch playlists from the API
        const res = await fetch('/api/music/playlist');
        const data = await res.json();
        this.playlists = data.playlists || [];
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
      const selected = this.playlists.find(p => p.id === this.selected_playlist_id); // find the selected playlist

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
      // navigate to the results page with the selected playlist id and preferences
      this.$router.push({
        name: 'RecommendationResult',
        params: {
          id: this.confirmed_playlist_selection.id,
        },
      });
    },
  },
};
</script>