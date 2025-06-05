<template>
  <div class="flex justify-center items-center flex-col">
    <div class="flex space-x-2 mb-3">
      <button
        @click="search_mode = 'simple'"
        :class="buttonClassToggle(search_mode === 'simple')"
      >
        Simple Search
      </button>
      <button
        @click="search_mode = 'advanced'"
        :class="buttonClassToggle(search_mode === 'advanced')"
      >
        Advanced Search
      </button>
    </div>

    <!-- simple search input -->
    <div class="flex flex-col min-w-1/2 max-w-min">
      <label
        v-if="search_mode === 'simple'"
        for="artist_input"
        class="text-neutral-300 justify-start ml-3 mb-3"
        >Search</label
      >
      <input
        v-if="search_mode === 'simple'"
        type="text"
        v-model="search_query"
        placeholder="The Beatles, A Day in the Life, etc.."
        class="py-3 px-5 mb-5 border text-neutral-200 border-neutral-600 bg-neutral-800 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-neutral-400 transition ease-in-out"
      />
    </div>
    <button
      v-if="search_mode === 'simple'"
      @click="handleSimpleSearch"
      class="bg-neutral-200 text-neutral-900 transition font-semibold min-w-2xs px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-300 ease-in-out"
    >
      Search
    </button>

    <!-- advanced search input -->
    <div class="flex flex-col justify-center items-center space-y-2 w-full">
      <div class="flex flex-col min-w-1/2 max-w-min">
        <label
          v-if="search_mode === 'advanced'"
          for="artist_input"
          class="text-neutral-300 justify-start ml-3 mb-3"
          >Artist name</label
        >
        <input
          v-if="search_mode === 'advanced'"
          type="text"
          name="artist_input"
          v-model="advanced_search_artist"
          placeholder="The Beatles"
          class="py-3 px-5 mb-5 border text-neutral-200 border-neutral-600 bg-neutral-800 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-neutral-400 transition ease-in-out"
        />
      </div>
      <div class="flex flex-col min-w-1/2 max-w-min">
        <label
          v-if="search_mode === 'advanced'"
          for="track_input"
          class="text-neutral-300 justify-start ml-3 mb-3"
          >Track name</label
        >
        <input
          v-if="search_mode === 'advanced'"
          type="text"
          name="track_input"
          v-model="advanced_search_track"
          placeholder="A Day in the Life"
          class="py-3 px-5 mb-5 border text-neutral-200 border-neutral-600 bg-neutral-800 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-neutral-400 transition ease-in-out"
        />
      </div>
      <button
        v-if="search_mode === 'advanced'"
        @click="handleAdvancedSearch"
        class="bg-neutral-200 text-neutral-900 font-semibold min-w-2xs px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-300 ease-in-out duration-200"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_mode: "simple",
      search_query: "",
    };
  },
  methods: {
    buttonClassToggle(active) {
      return active
        ? "bg-neutral-800 font-semibold text-neutral-200 px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-900 ease-in-out duration-200"
        : "bg-transparent text-neutral-500 px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-900 ease-in-out duration-200";
    },
    handleSimpleSearch() {
      if (!this.search_query.trim()) return;
      this.$router.push({
        name: "SearchResults",
        query: { q: this.search_query.trim() },
      });
    },
    handleAdvancedSearch() {
      const query = {};
      if (this.advanced_search_artist)
        query.artist = this.advanced_search_artist;
      if (this.advanced_search_track) query.track = this.advanced_search_track;
      if (!query.artist && !query.track) return;
      this.$router.push({
        name: "SearchResults",
        query,
      });
    },
  },
};
</script>
