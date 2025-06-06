<template>
  <div class="flex flex-col p-6 mx-auto max-w-4xl">
    <h1 class="text-xl font-semibold mb-5 text-neutral-300">Created Playlists</h1>

    <!-- button to create a new playlist -->
    <button
      @click="showFormModal"
      class="bg-neutral-200 text-neutral-900 max-w-3xs transition font-semibold px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-300 ease-in-out mb-5"
    >
      Create New Playlist
    </button>

    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- show playlists if exist -->
    <ul v-else-if="playlists.length" class="space-y-4">
      <li
        v-for="playlist in playlists"
        :key="playlist.id"
        @click="$router.push({ name: 'PlaylistDetails', params: { id: playlist.id } })"
        class="bg-neutral-900 border border-neutral-700 rounded-xl p-4 shadow hover:bg-neutral-800 cursor-pointer transition ease-in-out"
      >
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-col max-w-3/5">
            <h2 class="font-semibold text-lg text-neutral-300 mb-2">{{ playlist.name }}</h2>
            <p class="text-neutral-400 line-clamp-1">{{ playlist.description || "No Description." }}</p>
          </div>
          <div class="flex flex-row gap-10">
            <div class="flex flex-col items-center">
              <p class="text-neutral-500">Tracks</p>
              <h2 class="text-neutral-400 font-lg font-semibold">{{ playlist.added_tracks_count }}</h2>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-neutral-500">Last Updated</p>
              <h2 class="text-neutral-400 font-lg">{{ formatDate(playlist.last_updated) }}</h2>
            </div>
            <button
              @click.stop="showDeleteModal(playlist.id)"
              class="border-3 border-neutral-800 rounded-lg px-3 py-3 bg-neutral-900 hover:bg-red-500/50 hover:text-neutral-900 hover:cursor-pointer transition ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-neutral-400 transition ease-in-out">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- no playlists found message -->
    <div v-else-if="!loading && !playlists.length" class="text-neutral-400 text-center mt-10">
      No playlists found.
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
import ConfirmationModal from '../components/ConfirmationModal.vue';
import FormModal from '../components/FormModal.vue';
import { createToast } from '../stores/toastStore.js';

export default {
  components: {
    LoadingSpinner,
    ConfirmationModal,
    FormModal,
  },
  data() {
    return {
      loading: true,
      playlists: [],
      confirmationModalVisible: false,
      selected_playlist_id: null,
      formModalVisible: false,
      form: {
        name: '',
        description: '',
      },
    };
  },
  async mounted() {
    // fetch playlists from the API
    try {
      const res = await fetch('/api/music/playlist');
      const data = await res.json();
      this.playlists = data.playlists || [];
    } catch (error) {
      createToast('Error fetching playlists ' + error.message, 'error');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // format date to make it readable
    formatDate(dateInput) {
      const date = new Date(dateInput);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    },
    // delete a playlist
    async deletePlaylist(playlistId) {
      try {
        // make a request to the API to delete the playlist
        const res = await fetch(`/api/music/playlist/${playlistId}/delete`, {
          method: 'DELETE',
        });
        if (!res.ok) createToast('Playlist does not exist', 'error');
        else createToast('Playlist deleted successfully', 'success');
        this.playlists = this.playlists.filter(p => p.id !== playlistId); // remove deleted playlist from the list
        this.confirmationModalVisible = false; // close the modal after deletion
        this.selected_playlist_id = null; // reset selected playlist id
      } catch (error) {
        console.error('Error deleting playlist:', error);
      };
    },
    // show confirmation modal for deleting a playlist
    showDeleteModal(playlistId) {
      this.selected_playlist_id = playlistId;
      this.confirmationModalVisible = true;
    },
    // create a new playlist
    async createPlaylist() {
      const { name, description } = this.form;
      // must have a name for the playlist
      if (!name) {
        createToast('Playlist name is required', 'error');
        return;
      }

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

        const new_playlist = await res.json();
        this.playlists.push(new_playlist.playlist); // add the new playlist to the list
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
  },
}
</script>