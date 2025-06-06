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
          <th class="px-4 py-3 border border-x-0 border-r-1 rounded-tr-lg border-neutral-700">Tags</th>
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
          <!-- add bottom right rounded corners for last result row -->
          <td
            class="px-6 py-3 font-normal border-b border-r border-neutral-700"
            :class="{ 'rounded-br-lg': index === search_results.length - 1 }"
          >
            <span v-if="track.tags.length">{{ track.tags.join(", ") }}</span>
            <span v-else class="text-gray-400">--</span>
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
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner
  },
  data() {
    return {
      search_results: [],
      loading: true,
      limit: 15,
      offset: 0,
      total_search_results: 0,
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
  }
};
</script>
