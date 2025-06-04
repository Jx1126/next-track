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
    <input
      v-if="search_mode === 'simple'"
      type="text"
      v-model="search_query"
      placeholder="Search tracks..."
      class="py-3 px-5 mb-5 border rounded min-w-1/2 max-w-min focus:outline-none focus:ring-1 focus:ring-stone-800"
    />
    <button
      v-if="search_mode === 'simple'"
      @click="handleSimpleSearch"
      class="bg-stone-800 text-slate-200 min-w-2xs px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-stone-700 ease-in-out duration-200"
    >
      Search
    </button>

    <!-- advanced search input -->
    <div class="flex flex-col justify-center items-center space-y-2 w-full">
      <input
        v-if="search_mode === 'advanced'"
        type="text"
        v-model="advanced_search_artist"
        placeholder="Artist name..."
        class="py-3 px-5 border rounded min-w-1/2 max-w-min focus:outline-none focus:ring-1 focus:ring-stone-800"
      />
      <input
        v-if="search_mode === 'advanced'"
        type="text"
        v-model="advanced_search_track"
        placeholder="Track name..."
        class="py-3 px-5 mb-5 border rounded min-w-1/2 max-w-min focus:outline-none focus:ring-1 focus:ring-stone-800"
      />
      <button
        v-if="search_mode === 'advanced'"
        @click="handleAdvancedSearch"
        class="bg-stone-800 text-slate-200 min-w-2xs px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-stone-700 ease-in-out duration-200"
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
        ? "bg-slate-300 text-stone-800 px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-slate-300 ease-in-out duration-200"
        : "bg-transparent text-stone-800 px-5 py-3 rounded-lg hover:cursor-pointer hover:bg-slate-300 ease-in-out duration-200";
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
