<template>
  <Teleport to="body">
    <TransitionGroup name="fade" tag="div" class="fixed top-6 left-1/2 transform -translate-x-1/2 space-y-3 z-50">
      <div 
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="px-6 py-4 rounded-2xl shadow-2xl text-neutral-100 border backdrop-blur-lg transition-all duration-300 bg-neutral-900/90"
        :class="toast.type === 'error' ? 'border-rose-500/50 shadow-rose-500/30' : 'border-lime-500/50 shadow-lime-500/30'"
      >
        <p v-if="toast.type === 'error'" class="flex items-center gap-2 text-rose-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <span class="font-medium font-poppins text-rose-400 tracking-wide">Error:</span> 
          <span class="text-neutral-200 font-poppins font-light tracking-wide">{{ toast.message }}</span>
        </p>
        <p v-else-if="toast.type === 'success'" class="flex items-center gap-2 text-lime-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
          <span class="font-medium font-poppins text-lime-400 tracking-wide">Success:</span> 
          <span class="text-neutral-200 font-poppins font-light tracking-wide">{{ toast.message }}</span>
        </p>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script>
import { toastStore } from '../stores/toastStore.js';
export default {
  name: 'Toast',
  setup() {
    return { toastStore };
  },
};
</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}
</style>