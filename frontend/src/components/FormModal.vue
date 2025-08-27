<template>
  <!-- teleport modal to body for higher z-index value -->
  <Teleport to="body">
    <!-- only show modal if visible prop is true -->
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300">
      <div class="bg-neutral-900/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-xl w-full py-8 px-10 border border-cyan-700/30 mx-4 transform scale-100 transition-all duration-300">
        <div class="flex flex-col justify-between gap-6">
          <h1 class="text-2xl font-semibold font-poppins text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide">{{ title }}</h1>

          <!-- custom form content -->
          <form @submit.prevent="$emit('submit')">
            <div class="flex flex-col gap-6 mb-8">
              <slot />
            </div>
            <div class="flex justify-end gap-4">
              <!-- cancel button -->
              <button
                type="button"
                @click="$emit('cancel')"
                class="px-6 py-3 rounded-xl font-medium font-poppins text-neutral-300 border border-neutral-700/50 bg-neutral-800/50 hover:cursor-pointer hover:bg-neutral-700/50 hover:border-neutral-600/50 transition-all duration-300 ease-in-out"
              >
                Cancel
              </button>
              <!-- confirm button -->
              <button
                type="submit"
                class="px-6 py-3 rounded-xl font-medium font-poppins text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:cursor-pointer hover:from-cyan-600 hover:to-blue-600 hover:scale-102 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'ConfirmationModal',
  emits: ['submit', 'cancel'],
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: true,
    }
  },
};
</script>