<template>
  <div class="flex justify-center items-center flex-col">
    <!-- search input -->
    <input 
      type="text"
      v-model="search_query"
      @input="handleSearchInput"
      placeholder="Search tracks..."
      class="p-2 border rounded w-full"
    >

    <!-- search results list -->
    <ul v-if="searched_tracks.length" class="bg-gray-200 border rounded mt-2 align-start">
      <li
        v-for="track in searched_tracks"
        :key="track.id"
        @click="selectSearchedTracks(track)"
        class="hover:bg-black hover:text-white p-2 cursor-pointer ease-in-out duration-200"
      >
        {{ track.title }} by {{ track.artist }}
      </li>
    </ul>
  </div>
</template>

<script>
let debounce;

export default {
  data() {
    return {
      search_query: '',
      searched_tracks: [],
      selected_tracks: []
    };
  },
  methods: {
    // search input debounce to prevent excessive API calls
    handleSearchInput() {
      clearTimeout(debounce);
      if (this.search_query.length > 2) {
        debounce = setTimeout(() => {
          this.fetchSearchedTracks(this.search_query);
        }, 300);
      } else {
        this.searched_tracks = [];
      };
    },
    // fetch searched tracks from MusicBrainz API
    async fetchSearchedTracks(query) {
      const response = await fetch(
        `https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(query)}&fmt=json&limit=10`
      );
      const response_data = await response.json();
      this.searched_tracks = response_data.recordings.map(rec => ({
        id: rec.id,
        title: rec.title,
        artist: rec['artist-credit'][0]?.name || 'Unknown artist'
      }));
    },
    // select searched track and emit to searchPage
    selectSearchedTracks(track) {
      this.selected_tracks.push(track);
      this.search_query = '';
      this.searched_tracks = [];
      this.$emit('searchedTracksSelected', track);
    }
  }
}

</script>