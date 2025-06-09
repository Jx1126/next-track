<template>
  <div class="p-6 max-w-4xl mx-auto" v-if="playlist">
    <h1 class="text-2xl font-bold text-neutral-200 mb-4">{{ playlist.name }}</h1>
    <p class="text-neutral-400 text-lg mb-6">{{ playlist.description || 'No description provided.' }}</p>

    <LoadingSpinner v-if="loading" />

    <div v-else>
      <h2 class="text-xl font-semibold text-neutral-300 mb-2">Tracks in Playlist</h2>
      <table v-if="playlist.tracks.length" class="min-w-full table-auto text-neutral-300 shadow-lg bg-neutral-900 border-separate border-spacing-0">
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
          <tr v-for="(track, index) in playlist.tracks" :key="track.id">
            <td
              class="px-4 py-3 font-normal border-b-1 border-l-1 border-neutral-700"
              :class="{ 'rounded-bl-lg': index === playlist.tracks.length - 1 }"
            >
              {{ track.title }}
            </td>
            <td class="px-4 py-2 border-b-1 border-neutral-700">{{ track.artist }}</td>
            <td class="px-4 py-2 border-b-1 border-neutral-700">{{ formatDuration(track.length) }}</td>
            <td class="px-4 py-2 border-b-1 border-neutral-700">
              <span v-if="track.tags.length">{{ track.tags.join(", ") }}</span>
              <span v-else class="text-gray-400">--</span>
            </td>
            <td
              class="px-4 py-3 font-normal border-b border-r border-neutral-700"
              :class="{ 'rounded-br-lg': index === playlist.tracks.length - 1 }"
            >
              <button
                @click="showRemoveModal(track.id)"
                class="text-neutral-500 font-semibold hover:cursor-pointer hover:text-neutral-400 transition ease-in-out"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="text-neutral-400">No tracks have been added to this playlist yet.</p>
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