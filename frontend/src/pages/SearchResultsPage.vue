<template>
  <div class="flex flex-col p-6 mx-auto max-w-4xl">
    <h1 class="text-xl font-semibold mb-5 text-neutral-300">Search Results</h1>

    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- show results table if exist -->
    <table
      v-else-if="search_results.length"
      class="min-w-full table-auto text-neutral-300 shadow-lg bg-neutral-900 border-separate border-spacing-0"
    >
      <thead>
        <tr class="text-neutral-400 text-left">
          <th class="px-4 py-3 border border-r-0 rounded-tl-lg border-neutral-700">Track</th>
          <th class="px-4 py-3 border border-x-0 border-neutral-700">Artist</th>
          <th class="px-4 py-3 border border-x-0 border-neutral-700">Duration</th>
          <th class="px-4 py-3 border border-x-0 border-neutral-700">Tags</th>
          <th class="px-4 py-3 border border-x-0 border-r-1 rounded-tr-lg border-neutral-700">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(track, index) in search_results" :key="track.id">
          <!-- add bottom left rounded corners for last result row -->
          <td
            class="px-6 py-3 font-normal border-b-1 border-l-1 border-neutral-700"
            :class="{ 'rounded-bl-lg': index === search_results.length - 1 }"
          >
            {{ track.title }}
          </td>
          <td class="px-6 py-3 font-normal border-b-1 border-neutral-700">{{ track.artist }}</td>
          <td class="px-6 py-3 font-normal border-b-1 border-neutral-700">{{ formatDuration(track.length) }}</td>
          <td class="px-6 py-3 font-normal border-b-1 border-neutral-700">
            <span v-if="track.tags.length">{{ track.tags.join(", ") }}</span>
            <span v-else class="text-gray-400">--</span>
          </td>
          <!-- add bottom right rounded corners for last result row -->
          <td
            class="px-6 py-3 font-normal border-b border-r border-neutral-700"
            :class="{ 'rounded-br-lg': index === search_results.length - 1 }"
          >
            <div class="flex flex-row gap-3">
              <button
              @click="openViewModal(track)"
              class="text-neutral-500 font-semibold hover:cursor-pointer hover:text-neutral-400 transition ease-in-out"
              >
                View
              </button>
              <span class="text-neutral-700 font-semibold">|</span>
              <button
                @click="openAddModal(track)"
                class="text-neutral-500 font-semibold hover:cursor-pointer hover:text-neutral-400 transition ease-in-out"
              >
                Add
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- pagination controls -->
    <div v-if="!loading && search_results.length" class="flex justify-between items-center mt-5">
      <!-- previous page button -->
      <button
        @click="togglePreviousPage"
        :disabled="offset === 0"
        class="bg-neutral-800 text-neutral-200 px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-900 ease-in-out transition disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <!-- page indicator -->
      <span class="text-neutral-400">
        Page {{ currentResultsPage }} / {{ totalResultsPages }}
      </span>

      <!-- next page button -->
      <button
        @click="toggleNextPage"
        :disabled="offset + limit >= total_search_results"
        class="bg-neutral-800 text-neutral-200 px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-900 ease-in-out transition disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <!-- no results message -->
    <p v-else-if="!loading && search_results.length === 0" class="text-neutral-400 text-center font-semibold mt-5">No results found.</p>

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
            <ul class="ml-4 list-disc text-neutral-500">
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
        <div v-else class="text-neutral-400 text-sm">
          No playlists created... <router-link to="/playlists" class="underline">create new playlist here</router-link>.
        </div>
      </div>

    </ConfirmationModal>
  </div>
</template>

<script>
import ConfirmationModal from '../components/ConfirmationModal.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

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
        console.error('Error fetching search results:', error);
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
    // format duration into a better readable format (mm:ss)
    formatDuration(seconds) {
      if (!seconds) return '--';
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    openViewModal(track) {
      this.selected_track = track;
      this.modalMode = 'view';
      this.modalTitle = 'Track Information';
      this.modalDescription = 'Here are the details of the selected track.';
      this.modalVisible = true;
    },
    async openAddModal(track) {
      this.selected_track = track;
      this.modalMode = 'add';
      this.modalTitle = 'Add Track to Playlist';
      this.modalDescription = 'Select a playlist to add this track to.';
      this.modalVisible = true;

      try {
        const res = await fetch('/api/music/playlist');
        const data = await res.json();
        this.playlists = data.playlists || [];
      } catch (error) {
        console.error('Error fetching playlists:', error);
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
        alert('Please select at least one playlist to add the track to.');
        return;
      }
      try {
        // make API requests to add the track to each selected playlist
        await Promise.all(this.selected_playlist.map(async (playlistId) => {
          const res = await fetch(`/api/music/playlist/${playlistId}/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              track_id: this.selected_track.id,
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to add track to playlist');
        }));
      } catch (error) {
          console.error('Error adding track to playlist:', error);
          alert('Failed to add track to playlist. Please try again.');
      }
      this.selected_playlist = []; // reset selected playlists after action
      this.modalVisible = false; // close the modal after action
      this.selected_track = null; // reset selected track
    },
  }
};
</script>
