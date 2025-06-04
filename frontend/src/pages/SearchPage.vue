<template>
  <div class="p-4 mx-auto">
    <SearchBar @searchedTracksSelected="handleSelectedTracks" />

    <div v-if="selected_tracks.length > 0" class="mt-4">
      <h2 class="text-lg font-semibold mb-2 tracking-wide uppercase">Selected Tracks:</h2>
      <ul class="space-y-2">
        <li
          v-for="track in selected_tracks"
          :key="track.id"
          class="p-2 border rounded shadow-sm hover:bg-gray-100 transition-colors duration-200"
        >
          {{ track.title }} by {{ track.artist }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';

export default {
  components: { SearchBar },
  data() {
    return {
      selected_tracks: [],
    };
  },
  methods: {
    handleSelectedTracks(track) {
      this.selected_tracks.push(track);
    },
  },
}

</script>