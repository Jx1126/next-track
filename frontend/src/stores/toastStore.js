import { reactive } from "vue";

export const toastStore = reactive({
  toasts: [],
});

export function createToast(message, type = "error", duration = 3000) {
  const id = Date.now();
  const toast = { id, message, type };

  toastStore.toasts.push(toast);

  setTimeout(() => {
    const index = toastStore.toasts.findIndex((t) => t.id === id);
    if (index !== -1) toastStore.toasts.splice(index, 1);
  }, duration);
}
