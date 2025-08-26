<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <!-- backdrop blur layer -->
    <div class="absolute inset-0 backdrop-blur-lg bg-gradient-to-br from-neutral-900/70 via-cyan-900/15 to-neutral-800/70"></div>
    
    <!-- top blob -->
    <div
    class="absolute z-0 top-[-50%] left-[40%] w-[600px] h-[600px] bg-indigo-500/40 rounded-full blur-3xl animate-pulse"
    style="animation-duration: 4s;"
    ></div>
    <!-- right blob -->
    <div
    class="absolute z-0 bottom-[-25%] right-[-15%] w-[600px] h-[700px] bg-cyan-500/40 rounded-full blur-3xl animate-pulse"
    style="animation-duration: 6s; animation-delay: 1s;"
    ></div>
    <!-- left blob -->
    <div
    class="absolute z-0 top-[30%] left-[-15%] w-[600px] h-[700px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"
    style="animation-duration: 5s; animation-delay: 2s;"
    ></div>
    <!-- center blob -->
    <div
      class="absolute z-0 top-[60%] right-[30%] w-[400px] h-[400px] bg-purple-500/25 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 7s; animation-delay: 3s;"
    ></div>
  </div>
</template>

<script>
export default {
  name: "BackgroundBlobs",
};
</script>
