<template>
  <!-- teleport modal to body for higher z-index value -->
  <Teleport to="body">
    <!-- only show modal if visible prop is true -->
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition ease-in-out">
      <div class="bg-neutral-900 rounded-2xl shadow-xl max-w-xl w-full py-6 px-8 border border-neutral-700">
        <div class="flex flex-col justify-between gap-4">
          <h1 class="text-xl font-semibold text-neutral-300">{{ title }}</h1>

          <!-- custom form content -->
          <form @submit.prevent="$emit('submit')">
            <div class="flex flex-col gap-4 mb-5">
              <slot />
            </div>
            <div class="flex justify-end gap-2">
              <!-- cancel button -->
              <button
              type="button"
                @click="$emit('cancel')"
                class="px-4 py-2 rounded-lg font-semibold text-neutral-300 border border-neutral-700 hover:bg-neutral-800 hover:cursor-pointer transition ease-in-out"
              >
                Cancel
              </button>
              <!-- confirm button -->
              <button
                type="submit"
                class="px-4 py-2 rounded-lg font-semibold text-neutral-900 bg-neutral-300 hover:bg-neutral-400 hover:cursor-pointer transition ease-in-out"
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