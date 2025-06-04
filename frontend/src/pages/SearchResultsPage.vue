<template>
  <div class="flex flex-col p-6 mx-auto max-w-4xl">
    <h1 class="text-xl font-semibold mb-5">Search Results</h1>

    <!-- results table -->
    <table v-if="search_results.length" class="min-w-full table-auto border-collapse rounded-lg">
      <thead>
        <tr>
          <th>Track</th>
          <th>Artist</th>
          <th>Duration</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="track in search_results" :key="track.id">
          <td>{{ track.title }}</td>
          <td>{{ track.artist }}</td>
          <td>{{ track.length }}</td>
          <td>
            <span v-if="track.tags.length">{{ track.tags.join(', ') }}</span>
            <span v-else class="text-gray-400 italic">--</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_results: [],
      loading: true,
    };
  },
  async created() {
    const query_parameters = new URLSearchParams({ 
      ...this.$route.query, 
      limit: 10 
    }).toString();

    try {
      const res = await fetch(`/api/music/search?${query_parameters}`);
      const data = await res.json();
      this.search_results = data.search_result_tracks || [];
    } catch (error) {
      console.error('Search error:', error);
      this.search_results = [];
    } finally {
      this.loading = false;
    }
  }
}
</script>
