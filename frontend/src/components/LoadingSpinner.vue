<template>
  <div class="flex justify-center items-center mt-12">
    <div class="relative">
      <!-- music note symbol -->
      <div class="w-16 h-16 flex items-center justify-center">
        <svg class="w-12 h-12 text-cyan-400 animate-pulse-glow" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>
      
      <!-- floating dots around the note -->
      <div class="absolute inset-0">
        <div class="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-float-1"></div>
        <div class="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-float-2"></div>
        <div class="absolute top-2 left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
@keyframes pulse-glow {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.4));
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(34, 211, 238, 1)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.8));
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes float-1 {
  0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.5; }
  50% { transform: translateY(-15px) scale(1.2); opacity: 1; }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.5; }
  50% { transform: translateY(-12px) scale(1.1); opacity: 1; }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0px) scale(0.7); opacity: 0.4; }
  50% { transform: translateY(-10px) scale(1.3); opacity: 1; }
}

.animate-pulse-glow {
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.animate-float-1 {
  animation: float-1 1.8s ease-in-out infinite;
}

.animate-float-2 {
  animation: float-2 1.8s ease-in-out infinite 0.3s;
}

.animate-float-3 {
  animation: float-3 1.8s ease-in-out infinite 0.6s;
}
</style>