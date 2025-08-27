<template>
  <div class="flex flex-col p-8 mx-auto max-w-5xl">
    <!-- header section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold font-poppins mb-3 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide">Created Playlists</h1>
      <p class="text-neutral-400 text-lg font-poppins font-light">Manage your music collections</p>
    </div>

    <!-- create new playlist button -->
    <button
      @click="showFormModal"
      class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium font-poppins px-8 py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/25 hover:scale-102 transition-all duration-300 ease-out mb-8 max-w-xs group relative overflow-hidden hover:cursor-pointer"
    >
      <div class="flex items-center justify-center gap-3 font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Create New Playlist
      </div>
    </button>

    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- playlists grid -->
    <div v-else-if="playlists.length" class="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        @click="$router.push({ name: 'PlaylistDetails', query: { id: playlist.id } })"
        class="group bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer transition-all duration-300 ease-out hover:scale-102 hover:border-cyan-500/50 relative overflow-hidden"
      >
        <!-- background gradient on hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
        
        <div class="relative">
          <div class="flex flex-row justify-between items-start mb-4">
            <div class="flex flex-col flex-1 min-w-0 pr-4">
              <h2 class="font-medium font-poppins text-xl text-neutral-200 mb-2 group-hover:text-cyan-300 transition-colors duration-300 truncate">{{ playlist.name }}</h2>
              <p class="text-neutral-400 font-poppins font-light line-clamp-2 text-sm leading-relaxed">{{ playlist.description || "No description provided." }}</p>
            </div>
            
            <button
              @click.stop="showDeleteModal(playlist.id)"
              class="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 group/delete hover:cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-neutral-400 group-hover/delete:text-red-400 transition-colors duration-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center gap-6 text-sm font-poppins">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-cyan-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>
                <span class="text-neutral-400 font-medium">{{ playlist.added_tracks_count }}</span>
                <span class="text-neutral-400">{{ playlist.added_tracks_count === 1 ? 'track' : 'tracks' }}</span>
              </div>
              <div class="w-px h-4 bg-neutral-600"></div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-cyan-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span class="text-neutral-300">{{ formatDate(playlist.last_updated) }}</span>
              </div>
            </div>
            
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- no playlists found message -->
    <div v-else-if="!loading && !playlists.length" class="text-center mt-16">
      <div class="bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/30 rounded-2xl p-12 shadow-xl">
        <svg class="w-16 h-16 text-neutral-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
        </svg>
        <h3 class="text-xl font-semibold text-neutral-300 mb-2">No playlists yet</h3>
        <p class="text-neutral-400">Create your first playlist to get started</p>
      </div>
    </div>
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

  <!-- confirmation modal for deleting playlist -->
  <ConfirmationModal
    :visible="confirmationModalVisible"
    title="Delete Playlist"
    description="Are you sure you want to delete this playlist? This action cannot be undone."
    @confirm="deletePlaylist(selected_playlist_id)"
    @cancel="confirmationModalVisible = false"
  />
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import FormModal from '../components/FormModal.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import { createToast } from '../stores/toastStore.js';
import { getPlaylists, savePlaylists } from '../stores/playlistStore.js';
import { formatDate } from '../utils/utils.js';

export default {
  components: {
    LoadingSpinner,
    FormModal,
    ConfirmationModal
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
      },
      loading: true,
      confirmationModalVisible: false,
      formModalVisible: false,
      playlists: [],
      selected_playlist_id: null,
    };
  },
  async mounted() {
    const stored_playlists = getPlaylists();
    this.playlists = stored_playlists;
    this.loading = false;
  },
  watch: {
    // watch for route changes to update playlists
    '$route'() {
      const stored_playlists = getPlaylists();
      this.playlists = stored_playlists;
    },
  },
  methods: {
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
          body: JSON.stringify({ playlist_name: name, playlist_description: description }),
        });

        if (!res.ok) {
          createToast('Failed to create playlist', 'error');
          return;
        }
        
        const data = await res.json();
        const updated_playlist = data.playlist;
        createToast('Playlist created successfully', 'success');

        // update the local store with the new playlist
        const playlists = getPlaylists();
        playlists.push(updated_playlist);
        savePlaylists(playlists);

        // reset the form and close the modal
        this.formModalVisible = false;
        this.form = { name: '', description: '' };

        // redirect to the created playlist details page
        this.$router.push({
          name: 'PlaylistDetails',
          query: { id: updated_playlist.id },
        });

      } catch (error) {
        createToast('Error creating playlist: ' + error.message, 'error');
      }
    },
    // show form modal to create a new playlist
    showFormModal() {
      this.formModalVisible = true;
      this.form = { name: '', description: '' }; // reset form fields
    },
    // delete a playlist
    async deletePlaylist(playlistId) {
      try {
        // update the local store
        const playlists = getPlaylists();
        const updated_playlists = playlists.filter(p => p.id !== playlistId);
        savePlaylists(updated_playlists);

        this.playlists = updated_playlists;
        createToast('Playlist deleted successfully', 'success');
        this.confirmationModalVisible = false;
      } catch (error) {
        createToast('Failed to delete playlist: ' + error.message, 'error');
        this.confirmationModalVisible = false;
      }
    },
    // show confirmation modal for deleting a playlist
    showDeleteModal(playlistId) {
      this.selected_playlist_id = playlistId;
      this.confirmationModalVisible = true;
    },
    formatDate,
  }
};
</script>
