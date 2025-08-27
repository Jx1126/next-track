<template>
  <div class="absolute inset-0 overflow-hidden">
    <div class="h-full flex flex-col justify-center items-center px-6">
      <div class="flex flex-col items-center space-y-8 w-full max-w-2xl">
      <!-- header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold font-poppins text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide">Music Search</h1>
        <p class="text-neutral-400 text-lg font-poppins font-light">Build your playlist for recommendations</p>
      </div>

      <!-- search mode toggle -->
      <div class="bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 rounded-2xl p-2 shadow-xl">
        <div class="flex space-x-2">
          <button
            @click="search_mode = 'simple'"
            :class="[
              'px-6 py-3 rounded-xl font-medium font-poppins transition-all duration-300',
              search_mode === 'simple' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 hover:cursor-pointer'
            ]"
          >
            Simple Search
          </button>
          <button
            @click="search_mode = 'advanced'"
            :class="[
              'px-6 py-3 rounded-xl font-medium font-poppins transition-all duration-300',
              search_mode === 'advanced' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 hover:cursor-pointer'
            ]"
          >
            Advanced Search
          </button>
        </div>
      </div>

      <!-- simple search -->
      <div v-if="search_mode === 'simple'" class="w-full space-y-6">
        <div class="space-y-3">
          <label for="search_input" class="text-neutral-300 text-lg font-medium block pl-3">Search Music</label>
          <p class="text-neutral-500 text-md pl-3">Search by artist, track name, or any keyword</p>
          <input
            type="text"
            v-model="search_query"
            placeholder="The Beatles, A Day in the Life, etc.."
            class="w-full px-6 py-4 rounded-2xl bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 shadow-lg focus:shadow-cyan-700/50 ease-in-out"
          />
        </div>
        <button
          @click="handleSimpleSearch"
          class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/25 hover:scale-102 transition-all duration-300 ease-out group relative overflow-hidden hover:cursor-pointer"
        >
          <div class="flex items-center justify-center gap-3 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Search Music
          </div>
        </button>
      </div>

      <!-- advanced search -->
      <div v-if="search_mode === 'advanced'" class="w-full space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <label for="artist_input" class="text-neutral-300 text-lg font-medium block pl-3">Artist Name</label>
            <input
              type="text"
              v-model="artist_query"
              placeholder="The Beatles"
              class="w-full px-6 py-4 rounded-2xl bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 shadow-lg focus:shadow-cyan-700/50 ease-in-out"
            />
          </div>
          <div class="space-y-3">
            <label for="track_input" class="text-neutral-300 text-lg font-medium block pl-3">Track Name</label>
            <input
              type="text"
              v-model="track_query"
              placeholder="A Day in the Life"
              class="w-full px-6 py-4 rounded-2xl bg-neutral-900/60 backdrop-blur-lg border border-cyan-700/30 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 shadow-lg focus:shadow-cyan-700/50 ease-in-out"
            />
          </div>
        </div>
        <button
          @click="handleAdvancedSearch"
          class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/25 hover:scale-102 transition-all duration-300 ease-out group relative overflow-hidden hover:cursor-pointer"
        >
          <div class="flex items-center justify-center gap-3 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Advanced Search
          </div>
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_mode: "simple",
      search_query: "",
      artist_query: "",
      track_query: "",
    };
  },
  methods: {
    // simple search redirects to SearchResults page with search query parameter
    handleSimpleSearch() {
      if (!this.search_query.trim()) return; // prevent empty search
      this.$router.push({
        name: "SearchResults",
        query: { q: this.search_query.trim() },
      });
    },
    // advanced search redirects to SearchResults page with artist and track query parameters
    handleAdvancedSearch() {
      const query = {};
      if (this.artist_query) query.artist = this.artist_query;
      if (this.track_query) query.track = this.track_query;
      if (!query.artist && !query.track) return; // ensure at least one field is filled
      this.$router.push({
        name: "SearchResults",
        query,
      });
    },
  },
};
</script>
