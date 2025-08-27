<template>
  <!-- teleport modal to body for higher z-index value -->
  <Teleport to="body">
    <!-- only show modal if visible prop is true -->
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300">
      <div class="bg-neutral-900/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-xl w-full py-8 px-10 border border-cyan-700/30 mx-4 transform scale-100 transition-all duration-300">
        <div class="flex flex-col justify-between gap-6">
          <!-- modal headings -->
          <div class="flex flex-col gap-4">
            <h1 class="text-xl font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text tracking-wide">{{ title }}</h1>
            <p class="text-neutral-300 text-md leading-relaxed text-medium">{{ description }}</p>
          </div>

          <!-- custom form content if specified -->
          <div v-if="custom_contents" class="py-2">
            <slot />
          </div>

          <!-- action buttons -->
          <div class="flex justify-end gap-4">
            <!-- cancel button -->
            <button
              v-if="show_cancel"
              @click="$emit('cancel')"
              class="px-6 py-3 rounded-xl font-medium text-neutral-300 border border-neutral-700/50 bg-neutral-800/50 hover:bg-neutral-700/50 hover:border-neutral-600/50 hover:cursor-pointer transition-all duration-300 ease-in-out"
            >
              {{ cancel_button_text }}
            </button>
            <!-- confirm button -->
            <button
              v-if="show_confirm"
              @click="$emit('confirm')"
              class="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-102 hover:cursor-pointer shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 ease-in-out"
            >
              {{ confirm_button_text }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'ConfirmationModal',
  emits: ['confirm', 'cancel'],
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: true,
    },
    custom_contents: {
      type: Boolean,
      default: false,
    },
    show_confirm: {
      type: Boolean,
      default: true,
    },
    confirm_button_text: {
      type: String,
      default: 'Confirm',
    },
    show_cancel: {
      type: Boolean,
      default: true,
    },
    cancel_button_text: {
      type: String,
      default: 'Cancel',
    },
  },
};
</script>