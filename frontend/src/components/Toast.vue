<template>
  <Teleport to="body">
    <TransitionGroup name="fade" tag="div" class="fixed top-6 left-1/2 transfrom -translate-x-1/2 space-y-2 z-50">
      <div 
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="px-6 py-3 rounded-lg shadow-md text-neutral-300 border-3 bg-neutral-900 transition ease-in-out"
        :class="toast.type === 'error' ? 'border-rose-500 shadow-rose-500/50' : 'border-lime-500 shadow-lime-500/50'"
      >
        <p v-if="toast.type === 'error'">
          <span class="font-semibold text-rose-500">Error: </span> {{ toast.message }}
        </p>
        <p v-else-if="toast.type === 'success'">
          <span class="font-semibold text-lime-500">Success: </span> {{ toast.message }}
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
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>