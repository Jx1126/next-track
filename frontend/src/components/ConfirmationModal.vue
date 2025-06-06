<template>
  <!-- teleport modal to body for higher z-index value -->
  <Teleport to="body">
    <!-- only show modal if visible prop is true -->
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition ease-in-out">
      <div class="bg-neutral-900 rounded-2xl shadow-xl max-w-xl w-full py-6 px-8 border border-neutral-700">
        <div class="flex flex-col justify-between gap-4">
          <!-- modal headings -->
          <div class="flex flex-col gap-3">
            <h1 class="text-xl font-semibold text-neutral-300">{{ title }}</h1>
            <p class="text-neutral-400">{{ description }}</p>
          </div>

          <!-- custom form content if specified -->
          <div v-if="custom_contents">
            <slot />
          </div>

          <!-- action buttons -->
          <div class="flex justify-end gap-2">
            <!-- cancel button -->
            <button
              v-if="show_cancel"
              @click="$emit('cancel')"
              class="px-4 py-2 rounded-lg font-semibold text-neutral-300 border border-neutral-700 hover:bg-neutral-800 hover:cursor-pointer transition ease-in-out"
            >
              {{ cancel_button_text }}
            </button>
            <!-- confirm button -->
            <button
              v-if="show_confirm"
              @click="$emit('confirm')"
              class="px-4 py-2 rounded-lg font-semibold text-neutral-900 bg-neutral-300 hover:bg-neutral-400 hover:cursor-pointer transition ease-in-out"
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