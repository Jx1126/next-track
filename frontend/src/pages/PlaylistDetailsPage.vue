<template>
  <div class="p-8 max-w-6xl mx-auto">
    <!-- header section -->
    <div v-if="playlist" class="mb-8">
      <h1 class="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide mb-4">{{ playlist.name }}</h1>
      <p class="text-neutral-400 text-lg leading-relaxed">{{ playlist.description || 'No description provided.' }}</p>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="playlist">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-neutral-200">Tracks in Playlist</h2>
        <div class="bg-neutral-800/50 rounded-lg px-4 py-2 border border-neutral-700/30">
          <span class="text-neutral-400 text-sm">{{ playlist.tracks ? playlist.tracks.length : 0 }} tracks</span>
        </div>
      </div>

      <div
        v-if="playlist.tracks && playlist.tracks.length"
        class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl shadow-xl overflow-hidden"
      >
        <!-- table header -->
        <div class="bg-gradient-to-r from-neutral-800/80 to-cyan-900/60 px-6 py-4 border-b border-neutral-700/50">
          <div class="grid grid-cols-12 gap-4 text-neutral-300 font-semibold text-sm">
            <div class="col-span-4">Track</div>
            <div class="col-span-3">Artist</div>
            <div class="col-span-2">Duration</div>
            <div class="col-span-2">Tags</div>
            <div class="col-span-1 text-center">Action</div>
          </div>
        </div>

        <!-- table body -->
        <div class="divide-y divide-neutral-700/30">
          <div v-for="(track, index) in playlist.tracks" :key="track.id" 
                class="px-6 py-4 hover:bg-neutral-800/30 transition-colors duration-200 group">
            <div class="grid grid-cols-12 gap-4 items-center">
              <div class="col-span-4">
                <div class="flex items-center gap-5">
                  <div class="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"></div>
                  <span class="text-neutral-200 font-medium truncate">{{ track.title }}</span>
                </div>
              </div>
              <div class="col-span-3">
                <span class="text-neutral-400 truncate">{{ track.artist }}</span>
              </div>
              <div class="col-span-2">
                <span class="text-neutral-400">{{ formatDuration(track.length) }}</span>
              </div>
              <div class="col-span-2">
                <div v-if="track.tags.length" class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in track.tags.slice(0, 2)"
                    :key="tag" 
                    class="bg-neutral-800/60 px-2 py-1 rounded-full text-xs text-neutral-400 border border-neutral-700/50"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="track.tags.length > 2" class="text-xs text-neutral-500">+{{ track.tags.length - 2 }}</span>
                </div>
                <span v-else class="text-neutral-500 text-sm">No tags</span>
              </div>
              <div class="col-span-1 text-center">
                <button
                  @click="showRemoveModal(track.id)"
                  class="p-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 group/remove opacity-0 group-hover:opacity-100 hover:cursor-pointer"
                >
                  <svg class="w-4 h-4 text-neutral-400 group-hover/remove:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- no tracks message -->
      <div v-else class="text-center mt-16">
        <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-12 shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16 text-neutral-500 mx-auto mb-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
          </svg>

          <h3 class="text-xl font-medium text-neutral-300 mb-2">No tracks yet</h3>
          <p class="text-neutral-400">This playlist is empty. Add some tracks to get started!</p>
        </div>
      </div>
    </div>
  </div>

  <!-- confirmation modal to track removal -->
  <ConfirmationModal
    :visible="modalVisible"
    title="Remove Track from Playlist"
    description="Are you sure you want to remove this track from the playlist? This action cannot be undone."
    @confirm="removeTrack(selected_track_id)"
    @cancel="modalVisible = false"
  />
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import { createToast } from '../stores/toastStore.js';
import { getPlaylistById, updatePlaylist } from '../stores/playlistStore.js';

export default {
  components: {
    LoadingSpinner,
    ConfirmationModal,
  },
  data() {
    return {
      playlist: null,
      loading: true,
      modalVisible: false,
      selected_track_id: null,
      current_playlist_id: null,
    };
  },
  mounted() {
    const id = this.$route.query.id;
    const playlist = getPlaylistById(id);

    // check if the playlist exists
    if (playlist) {
      this.playlist = playlist;
      this.current_playlist_id = id;
      this.loading = false;
    } else {
      createToast('Playlist not found', 'error');
      // redirect to playlists page if not found
      this.$router.push({
        name: 'Playlists',
      });
    }
  },
  watch: {
    // watch for changes in the route query to update the playlist
    '$route.query.id'(id) {
      const playlist = getPlaylistById(id);
      if (playlist) {
        this.playlist = playlist;
        this.current_playlist_id = id;
        this.loading = false;
      } else {
        createToast('Playlist not found', 'error');
        this.$router.push({
          name: 'Playlists',
        });
      }
    }
  },
  methods: {
    // format duration into a better readable format (mm:ss)
    formatDuration(seconds) {
      if (!seconds) return '--';
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    // show confirmation modal for track removal
    showRemoveModal(trackId) {
      this.selected_track_id = trackId;
      this.modalVisible = true;
    },
    // remove track from playlist
    async removeTrack(trackId) {
      try {
        const res = await fetch(`/api/music/playlist/remove`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playlist: this.playlist, track_id: trackId }),
        })

        // check if the response is ok
        if (!res.ok) {
          createToast('Track does not exist in this playlist', 'error');
          return;
        }
        
        const data = await res.json();
        this.playlist = data.playlist; // update the playlist with the new data
        updatePlaylist(this.current_playlist_id, this.playlist.tracks); // update the local store
        createToast('Track removed successfully', 'success');
        
        // reset modal state
        this.modalVisible = false;
        this.selected_track_id = null;
      } catch (error) {
        createToast('Failed to remove track: ' + error.message, 'error');
      }
    },
  }
};
</script>