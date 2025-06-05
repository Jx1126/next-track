<template>
  <div class="flex flex-col p-6 mx-auto max-w-4xl">
    <h1 class="text-xl font-semibold mb-5 text-neutral-300">Created Playlists</h1>

    <!-- loading spinner -->
    <div v-if="loading" class="flex justify-center items-center mt-10">
      <svg aria-hidden="true" class="w-8 h-8 text-neutral-700 animate-spin fill-cyan-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>

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
            <button class="border-3 border-neutral-800 rounded-lg px-3 py-3 bg-neutral-900 hover:bg-red-500/50 hover:text-neutral-900 hover:cursor-pointer transition ease-in-out">
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

</template>

<script>
export default {
  data() {
    return {
      loading: true,
      playlists: [],
    };
  },
  async mounted() {
    // fetch playlists from the API
    try {
      const res = await fetch('/api/music/playlist');
      const data = await res.json();
      this.playlists = data.playlists || [];
    } catch (error) {
      console.error('Error fetching playlists:', error);
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
  },
}
</script>