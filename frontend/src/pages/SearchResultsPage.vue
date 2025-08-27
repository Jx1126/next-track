<template>
  <div class="p-8 max-w-6xl mx-auto">
    <!-- header -->
    <div class="mb-8">
      <h1 class="text-3xl font-semibold font-poppins text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide mb-4">Search Results</h1>
      <p class="text-neutral-400 text-lg font-poppins font-light">Found {{ search_results.length }} tracks</p>
    </div>

    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- results table -->
    <div v-else-if="search_results.length" class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl shadow-xl overflow-hidden">
      <!-- table header -->
      <div class="bg-gradient-to-r from-neutral-800/80 to-cyan-900/60 px-6 py-4 border-b border-neutral-700/50">
        <div class="grid grid-cols-12 gap-4 text-neutral-300 font-medium font-poppins text-sm">
          <div class="col-span-3">Track</div>
          <div class="col-span-3">Artist</div>
          <div class="col-span-2">Duration</div>
          <div class="col-span-2">Tags</div>
          <div class="col-span-2 text-center">Actions</div>
        </div>
      </div>

      <!-- table body -->
      <div class="divide-y divide-neutral-700/30 max-h-96 overflow-y-auto custom-scrollbar">
        <div v-for="(track, index) in search_results" :key="track.id" 
              class="px-6 py-4 hover:bg-neutral-800/30 transition-colors duration-200 group">
          <div class="grid grid-cols-12 gap-4 items-center">
            <div class="col-span-3 min-w-0">
              <div class="flex items-center gap-5">
                <div class="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"></div>
                <span class="text-neutral-200 font-medium truncate block" title="{{ track.title }}">{{ track.title }}</span>
              </div>
            </div>
            <div class="col-span-3 min-w-0">
              <span class="text-neutral-400 truncate block" title="{{ track.artist }}">{{ track.artist }}</span>
            </div>
            <div class="col-span-2">
              <span class="text-neutral-400">{{ formatDuration(track.length) }}</span>
            </div>
            <div class="col-span-2">
              <div v-if="track.tags.length" class="flex flex-wrap gap-1">
                <span v-for="tag in track.tags.slice(0, 2)" :key="tag" 
                      class="bg-neutral-800/60 px-2 py-1 rounded-full text-xs text-neutral-400 border border-neutral-700/50">
                  {{ tag }}
                </span>
                <span v-if="track.tags.length > 2" class="text-xs text-neutral-500">+{{ track.tags.length - 2 }}</span>
              </div>
              <span v-else class="text-neutral-500 text-sm">No tags</span>
            </div>
            <div class="col-span-2">
              <div class="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  @click="openViewModal(track)"
                  class="hover:cursor-pointer ease-in-out px-3 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-neutral-400 hover:text-cyan-400 text-sm font-medium"
                >
                  View
                </button>
                <button
                  @click="openAddModal(track)"
                  class="hover:cursor-pointer ease-in-out px-3 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 text-neutral-400 hover:text-green-400 text-sm font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination controls -->
    <div v-if="!loading && search_results.length" class="flex justify-between items-center mt-8">
      <!-- previous page button -->
      <button
        @click="togglePreviousPage"
        :disabled="offset === 0"
        class="hover:cursor-pointer px-6 py-3 rounded-xl font-semibold text-neutral-300 border border-neutral-700/50 bg-neutral-800/50 hover:bg-neutral-700/50 hover:border-neutral-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        Previous
      </button>

      <!-- page indicator -->
      <span class="text-neutral-400 font-medium">
        Page {{ currentResultsPage }} / {{ totalResultsPages }}
      </span>

      <!-- next page button -->
      <button
        @click="toggleNextPage"
        :disabled="offset + limit >= total_search_results"
        class="hover:cursor-pointer px-6 py-3 rounded-xl font-semibold text-neutral-300 border border-neutral-700/50 bg-neutral-800/50 hover:bg-neutral-700/50 hover:border-neutral-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        Next
      </button>
    </div>

    <!-- No Results Message -->
    <div v-else-if="!loading && search_results.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-18 text-neutral-600 mx-auto">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-neutral-300 mb-2">No results found</h3>
      <p class="text-neutral-500">Try adjusting your search terms or browse our music collection</p>
    </div>

    <!-- confirmation modal -->
    <ConfirmationModal
      :visible="modalVisible"
      :title="modalTitle"
      :description="modalDescription"
      :custom_contents="true"
      :show_cancel="modalMode !== 'view'"
      :confirm_button_text="modalMode == 'view' ? 'Close' : 'Add to Playlist'"
      @confirm="handleModalAction"
      @cancel="modalVisible = false"
    >
      <!-- view track details modal -->
      <div v-if="modalMode === 'view'">
        <ul class=" text-neutral-400 space-y-1">
          <li>
            <span class="mr-2">Track:</span>
            <span class="text-neutral-300">{{ selected_track.title }}</span>
          </li>
          <li>
            <span class="mr-2">Artist:</span>
            <span class="text-neutral-300">{{ selected_track.artist }}</span>
          </li>
          <li>
            <span class="mr-2">Duration:</span>
            <span class="text-neutral-300">{{ formatDuration(selected_track.length) }}</span>
          </li>
          <li>
            <span class="mr-2">Tags:</span>
            <span class="text-neutral-300">{{ selected_track.tags.length ? selected_track.tags.join(', ') : 'None' }}</span>
          </li>
          <li>
            <span class="mr-2">Releases:</span>
            <div class="ml-2 mr-2 mt-2 max-h-48 overflow-y-auto border border-neutral-700/30 rounded-lg bg-neutral-800/30 p-3 custom-scrollbar">
              <ul class="list-disc text-neutral-500 space-y-2">
                <!-- loop through all the releases and display them -->
                <li
                  v-for="release in selected_track.releases"
                  :key="release.id"
                  class="space-x-2"
                >
                  <span class="text-neutral-300">{{ release.title }}</span>
                  <span v-if="release.date" class="text-neutral-400">({{ release.date }})</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <!-- add to playlist modal -->
      <div v-else-if="modalMode === 'add'">
        <div v-if="playlists.length" class="space-y-2">
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <!-- update the button class based on the selection state -->
            <button
              v-for="playlist in playlists"
              :key="playlist.id"
              @click="togglePlaylistSelection(playlist.id)"
              :class="[
                'text-neutral-300 font-semibold px-4 py-2 rounded-lg w-full text-left border transition ease-in-out',
                selected_playlist.includes(playlist.id) ? 'border-cyan-700 bg-cyan-900/20' : 'border-neutral-700 bg-neutral-800'
              ]"
            >
              {{ playlist.name }}
            </button>
          </div>
        </div>
        <!-- no playlists message -->
        <div v-else class="text-neutral-400">
          <div class="flex flex-col">
            <span>No playlists created..</span>
            <span>
              Create a new playlist
              <router-link to="/playlists" class="underline font-semibold text-neutral-300 transition ease-in-out hover:text-neutral-400">here</router-link>.
            </span>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  </div>
</template>

<script>
import ConfirmationModal from '../components/ConfirmationModal.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { createToast } from '../stores/toastStore.js';
import { formatDuration } from '../utils/utils.js';
import { getPlaylists, updatePlaylist } from '../stores/playlistStore.js';

export default {
  components: {
    LoadingSpinner,
    ConfirmationModal,
  },
  data() {
    return {
      search_results: [],
      loading: true,
      limit: 15,
      offset: 0,
      total_search_results: 0,
      modalVisible: false,
      modalMode: 'view',
      modalTitle: '',
      modalDescription: '',
      selected_track: null,
      playlists: [],
      selected_playlist: [],
      show_cancel: false,
      show_confirm_text: "Return"
    };
  },
  computed: {
    // calculate current page number (default: 1)
    currentResultsPage() {
      return Math.floor(this.offset / this.limit) + 1;
    },
    // calculate total number of pages
    totalResultsPages() {
      return Math.ceil(this.total_search_results / this.limit);
    },
  },
  watch: {
    // watch for updates in the route query to refetch results
    '$route.query': {
      immediate: true,
      handler() {
        this.offset = 0;
        this.fetchSearchResults();
      }
    }    
  },
  methods: {
    // fetch search results from the backend API
    async fetchSearchResults() {
      this.loading = true;

      // construct query parameters from the current route and pagination
      const query_params = new URLSearchParams({
        ...this.$route.query,
        limit: this.limit,
        offset: this.offset,
      }).toString();

      try {
        const res = await fetch(`/api/music/search?${query_params}`);
        const data = await res.json();
        this.search_results = data.search_result_tracks || [];
        this.total_search_results = data.total_search_result_tracks || 0;
      } catch (error) {
        createToast('Error fetching search results: ' + error.message, 'error');
        this.search_results = [];
        this.total_search_results = 0;
      } finally {
        this.loading = false;
      }
    },
    // move to the next page if available
    toggleNextPage() {
      if (this.currentResultsPage < this.totalResultsPages) {
        this.offset += this.limit;
        this.fetchSearchResults();
      }
    },
    // return to the previous page if available
    togglePreviousPage() {
      if (this.currentResultsPage > 1) {
        this.offset -= this.limit;
        this.fetchSearchResults();
      }
    },
    // open modal to view track details
    openViewModal(track) {
      this.selected_track = track;
      this.modalMode = 'view';
      this.modalTitle = 'Track Information';
      this.modalDescription = 'Here are the details of the selected track.';
      this.modalVisible = true;
    },
    // open modal to add track to a playlist
    async openAddModal(track) {
      this.selected_track = track;
      this.modalMode = 'add';
      this.modalTitle = 'Add Track to Playlist';
      this.modalDescription = 'Select a playlist to add this track to.';
      this.modalVisible = true;

      try {
        this.playlists = getPlaylists(); // fetch playlists from the store
      } catch (error) {
        createToast('Error fetching playlists: ' + error.message, 'error');
        this.playlists = [];
      }
    },
    // toggle selection state of a playlist
    togglePlaylistSelection(playlistId) {
      const index = this.selected_playlist.indexOf(playlistId);
      if (index > -1) {
        this.selected_playlist.splice(index, 1); // remove if already selected
      } else {
        this.selected_playlist.push(playlistId); // add if not selected
      }
    },
    // handle modal actions based on the current mode
    async handleModalAction() {
      if (this.modalMode === 'add') {
        await this.addTrackToPlaylist();
      }
      this.modalVisible = false; // close the modal after action
    },
    // add selected track to the selected playlists
    async addTrackToPlaylist() {
      // add selected track to the selected playlists
      if (this.selected_playlist.length === 0) {
        createToast('Please select at least one playlist to add the track to.', 'error');
        return;
      }

      try {
        let playlists = getPlaylists(); // fetch playlists from the store
        let added_success_count = 0;

        for (const playlistId of this.selected_playlist) {
          const playlist = playlists.find(p => p.id === playlistId);
          // check if the playlist exists
          if (!playlist) {
            createToast(`Playlist with ID ${playlistId} not found`, 'error');
            continue;
          }

          try {
            const res = await fetch(`/api/music/playlist/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ playlist, track_id: this.selected_track.id }),
            });

            const data = await res.json();

            if (!res.ok) {
              createToast('Failed to add track to playlist', 'error');
            } else {
              const updated_playlist = data.playlist;
              updatePlaylist(playlistId, updated_playlist.tracks); // update the local store
              added_success_count++;
            }
          } catch (error) {
            createToast(`Error fetching playlist with ID ${playlistId}: ` + error.message, 'error');
            continue;
          }
        }
        // show success message if at least one track was added successfully
        if (added_success_count > 0) {
          createToast('Track added successfully to selected playlist(s).', 'success');
        }
      } catch (error) {
        createToast('Error adding track to playlist: ' + error.message, 'error');
        return;
      };
    },
    formatDuration,
  }
};
</script>

<style scoped>
/* Custom scrollbar styling for dark theme */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgb(38, 38, 38);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgb(82, 82, 82);
  border-radius: 4px;
  border: 1px solid rgb(64, 64, 64);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgb(115, 115, 115);
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: rgb(38, 38, 38);
}

/* firefox scrollbar styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgb(82, 82, 82) rgb(38, 38, 38);
}
</style>
