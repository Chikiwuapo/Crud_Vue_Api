import { ref } from 'vue';

const toasts = ref([]);

export function useToast() {
  const addToast = (type, message) => {
    const id = Date.now();
    toasts.value.push({ id, type, message });
  };

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return {
    toasts,
    addToast,
    removeToast
  };
}
