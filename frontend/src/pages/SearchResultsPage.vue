<template>
  <div class="flex flex-col p-6 mx-auto max-w-4xl">
    <h1 class="text-xl font-semibold mb-5 text-neutral-300">Search Results</h1>

    <!-- loading spinner -->
    <div v-if="loading" class="flex justify-center items-center mt-10">
      <svg aria-hidden="true" class="w-8 h-8 text-neutral-700 animate-spin fill-cyan-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>

    <!-- show results table if exist -->
    <table
      v-else-if="search_results.length"
      class="min-w-full table-auto text-neutral-300 shadow-lg bg-neutral-900 border-separate border-spacing-0"
    >
      <thead>
        <tr class="text-neutral-400 text-left">
          <th class="px-6 py-3 border border-r-0 border-neutral-700 font-semibold rounded-tl-lg">Track</th>
          <th class="px-6 py-3 border border-l-0 border-r-0 border-neutral-700 font-semibold">Artist</th>
          <th class="px-6 py-3 border border-l-0 border-r-0 border-neutral-700 font-semibold">Duration</th>
          <th class="px-6 py-3 border border-l-0 border-neutral-700 font-semibold  rounded-tr-lg">Tags</th>
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
          <td class="px-6 py-3 font-normal border-b-1 border-neutral-700">{{ track.length }}</td>
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
export default {
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
    }
  }
};
</script>
