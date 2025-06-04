<template>

  <div class="bg-gray-200 smooth-scroll">
    <!-- background blobs -->
    <div class="z-1">
      <BackgroundBlobs />
    </div>

    <div class="mx-auto container min-h-screen p-4 z-5 relative">
      <div class="app">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundBlobs from './components/BackgroundBlobs.vue';

export default {
  components: {
    BackgroundBlobs,
  },
};
</script>