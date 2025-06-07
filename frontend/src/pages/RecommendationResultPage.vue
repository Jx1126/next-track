<template>
  <div class="flex flex-col max-w-4xl justify-center items-center mx-auto">
    <!-- selected playlist display -->
    <div v-if="!loading" class="flex flex-col space-y-4 w-full items-center">
      <h2 class="text-lg font-semibold text-neutral-300 w-full text-left ml-5">Selected Playlist</h2>
      <div class="bg-neutral-900 border border-neutral-700 rounded-xl p-4 w-full mb-12">
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
          </div>
        </div>
      </div>
      
      <h2 class="text-lg font-semibold text-neutral-300 w-full text-left ml-5">Recommendation Result</h2>
      <div class="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full flex flex-col items-center gap-5">
        <h2 class="text-lg text-neutral-400">Your Recommended Track is</h2>
        <div class="flex flex-col items-center gap-1">
          <h1 class="text-xl font-bold text-cyan-500">{{ recommended_track.title }}</h1>
          <h2 class="text-lg text-neutral-400">by <span class="font-semibold text-neutral-300">{{ recommended_track.artist }}</span></h2>
        </div>
        <iframe
          v-if="recommended_track.youtube_link" 
          :src=formatYoutubeLink(recommended_track.youtube_link)
          frameborder="0"
          allowfullscreen
          class="w-full h-96 rounded-lg shadow-lg mt-4 border-2 border-neutral-700"
        ></iframe>
        <p v-else>Sorry, no YouTube embed available for this track.</p>

        <button
          @click="regenerateRecommendation"
          class="border border-neutral-700 text-neutral-300 transition font-semibold px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-800 ease-in-out"
        >
          Regenerate
        </button>
      </div>
    </div>

    <!-- loading spinner -->
    <LoadingSpinner v-if="loading" class="mt-8" />
  </div>

</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { createToast } from '../stores/toastStore.js';

export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      loading: true,
      playlist: {},
      recommended_track: {},
    };
  },
  async mounted() {
    const playlist_id = this.$route.params.id;

    try {
      // get recommendation results from the API
      const res = await fetch(`/api/music/recommend/${playlist_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences: {} }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch recommendation');
      }

      const data = await res.json();
      this.playlist = data.playlist || {}; // playlist details
      this.recommended_track = data.recommended_track || {}; // recommended track details
    } catch (error) {
      createToast('Failed to load recommendation results: ' + error.message, 'error');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // format date to make it readable
    formatDate(dateInput) {
      const date = new Date(dateInput);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    },
    // format YouTube link to embed
    formatYoutubeLink(link) {
      // validation: there must be a link
      if(!link) return '';
      // get the video id from the entire link
      const video_id = new URL(link).searchParams.get('v');
      return `https://www.youtube.com/embed/${video_id}`;
    },
    // regenerate recommendation
    async regenerateRecommendation() {
      this.loading = true; // show loading spinner
      try {
        const playlist_id = this.$route.params.id;
        const res = await fetch(`/api/music/recommend/${playlist_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ preferences: {} }),
        });

        if (!res.ok) {
          throw new Error('Failed to regenerate recommendation');
        }

        const data = await res.json();
        this.recommended_track = data.recommended_track || {}; // update recommended track
      } catch (error) {
        createToast('Failed to regenerate recommendation: ' + error.message, 'error');
      } finally {
        this.loading = false; // hide loading spinner
      }
    },
  }
};
</script>