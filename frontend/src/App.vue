<template>
  <div class="relative" style="background-color: #0a0a0a">
    <!-- navigation bar -->
    <NavBar />

    <!-- background blobs -->
    <div class="z-1 fixed inset-0 pointer-events-none">
      <BackgroundBlobs />
    </div>

    <div class="mx-auto container min-h-screen p-4 z-5 relative pt-25">
      <div class="app">
        <router-view />
        <Toast />
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundBlobs from "./components/BackgroundBlobs.vue";
import NavBar from "./components/NavBar.vue";
import Toast from "./components/Toast.vue";

export default {
  components: {
    BackgroundBlobs,
    NavBar,
    Toast,
  },
};
</script>
