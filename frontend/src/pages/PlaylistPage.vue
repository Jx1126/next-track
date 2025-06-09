<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="created_playlist && !loading">
      <h1 class="text-2xl font-bold text-neutral-200 mb-4">{{ playlist.name }}</h1>
      <p class="text-neutral-400 text-lg mb-6">{{ playlist.description || 'No description provided.' }}</p>

      <div>
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

    <div v-else-if="!created_playlist && !loading">
      <h1 class="text-2xl font-bold text-neutral-300 mb-4">Create Your Playlist</h1>
      <p class="text-neutral-400 mb-">You don't have a playlist yet. Create one to use it as a seed for track recommendation!</p>

      <button
        @click="showFormModal"
        class="bg-neutral-200 text-neutral-900 max-w-3xs transition font-semibold px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-300 ease-in-out mb-5"
      >
        Create New Playlist
      </button>
    </div>

    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" />
  </div>

  <!-- form modal to create a new playlist -->
   <FormModal
    :visible="formModalVisible"
    title="Create New Playlist"
    @submit="createPlaylist"
    @cancel="formModalVisible = false"
  >
    <!-- playlist name input -->
    <div class="flex flex-col gap-2">
      <label for="name" class="text-neutral-400 pl-1">Playlist Name</label>
      <input
        v-model="form.name"
        id="name"
        type="text"
        placeholder="The spring playlist"
        class="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition ease-in-out"
        required
      />
    </div>
    <!-- playlist description input -->
    <div class="flex flex-col gap-2">
      <label for="description" class="text-neutral-400 pl-1">Playlist Description</label>
      <textarea
        v-model="form.description"
        id="description"
        placeholder="A playlist for the spring season"
        class="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition ease-in-out"
        rows="3"
        ></textarea>
    </div>
  </FormModal>

  <!-- confirmation modal to track removal -->
  <ConfirmationModal
    :visible="confirmationModalVisible"
    title="Remove Track from Playlist"
    description="Are you sure you want to remove this track from the playlist? This action cannot be undone."
    @confirm="removeTrack(selected_track_id)"
    @cancel="confirmationModalVisible = false"
  />
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import FormModal from '../components/FormModal.vue';
import { createToast } from '../stores/toastStore.js';

export default {
  components: {
    LoadingSpinner,
    FormModal,
    ConfirmationModal,
  },
  data() {
    return {
      playlist: {
        name: '',
        description: '',
        tracks: [],
      },
      form: {
        name: '',
        description: '',
      },
      playlist_token: '',
      loading: true,
      confirmationModalVisible: false,
      formModalVisible: false,
      selected_track_id: null,
      created_playlist: false,
    };
  },
  async mounted() {
    await this.checkForPlaylist();
  },
  methods: {
    // check for a playlist
    async checkForPlaylist() {
      this.loading = true;
      const playlist_token = this.$route.query.token;
      if (playlist_token) {
        await this.loadPlaylistDetails(playlist_token); // load playlist details if token is present
      } else {
        this.created_playlist = false; // reset created playlist flag
        this.loading = false; // set loading to false if no token is provided
      }
    },
    // load playlist details
    async loadPlaylistDetails(playlist_token) {
      try {
        const res = await fetch(`/api/music/playlist/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playlist_token: playlist_token }),
        });

        if (!res.ok) {
          createToast('Failed to load playlist details', 'error');
          this.created_playlist = false;
          this.loading = false;
          return;
        }

        const data = await res.json();
        this.playlist = data.playlist; // set the playlist data
        this.playlist_token = playlist_token; // store the playlist token
        this.created_playlist = true;

      } catch (error) {
        createToast('Error loading playlist: ' + error.message, 'error');
        this.created_playlist = false; // reset created playlist flag
      } finally {
        this.loading = false; // set loading to false after fetching data
      }
    },
    // create a new playlist
    async createPlaylist() {
      const { name, description } = this.form;
      // must have a name for the playlist
      if (!name) {
        createToast('Playlist name is required', 'error');
        return;
      }
      // fetch API to create a new playlist
      try {
        const res = await fetch('/api/music/playlist/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playlist_name: name,
            playlist_description: description }),
        });

        if (!res.ok) createToast('Failed to create playlist', 'error');
        else createToast('Playlist created successfully', 'success');

        const data = await res.json();
        this.playlist = data.playlist; // set the newly created playlist data
        this.created_playlist = true; // set created playlist flag
        this.playlist_token = data.playlist_token; // store the playlist token

        this.$router.replace({
          name: 'Playlist',
          query: { token: this.playlist_token },
        });

        this.formModalVisible = false; // close the modal after creation
        this.form = { name: '', description: '' }; // reset form fields
      } catch (error) {
        createToast('Error creating playlist: ' + error.message, 'error');
      }
    },
    // show form modal to create a new playlist
    showFormModal() {
      this.formModalVisible = true;
      this.form = { name: '', description: '' }; // reset form fields
    },
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
      this.confirmationModalVisible = true;
    },
    // remove track from playlist
    async removeTrack(trackId) {
      const playlist_token = this.$route.query.token; // get playlist token from query
      
      // validation: ensure playlist token is provided
      if (!playlist_token) {
        createToast('No playlist token provided', 'error');
        this.loading = false;
        return;
      }

      // remove track from playlist
      try {
        const res = await fetch(`/api/music/playlist/remove`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            playlist_token: this.playlist_token,
            track_id: trackId
          }),
        })

        // check if the response is ok
        if (!res.ok) createToast('Track does not exist in this playlist', 'error');
        else createToast('Track removed successfully', 'success');

        const data = await res.json();
        this.playlist.tracks = this.playlist.tracks.filter(track => track.id !== trackId); // remove the track from the local playlist data
        this.playlist_token = data.playlist_token; // update playlist token
        this.playlist = data.playlist; // update playlist data

        this.$router.replace({
          name: 'Playlist',
          query: { token: this.playlist_token },
        });

        this.confirmationModalVisible = false; // close the modal after removal
        this.selected_track_id = null; // reset selected track id
      } catch (error) {
        createToast('Failed to remove track: ' + error.message, 'error');
      }
    },
  }
};
</script>
