<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);
const progress = ref(100);

onMounted(() => {
  // Iniciar el vaciado de la barra
  setTimeout(() => {
    progress.value = 0;
  }, 50);

  // Cerrar el toast después de 2 segundos (según requerimiento)
  setTimeout(() => {
    emit('close', props.toast.id);
  }, 2000);
});
</script>

<template>
  <div 
    class="relative overflow-hidden w-full max-w-[320px] bg-cream-50/95 backdrop-blur-md rounded-[2rem] shadow-xl border border-gold-200 pointer-events-auto group"
    v-motion
    :initial="{ opacity: 0, x: 100 }"
    :enter="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }"
    :leave="{ opacity: 0, x: 100, transition: { duration: 300 } }"
  >
    <div class="flex items-center p-4 space-x-4">
      <div 
        class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full"
        :class="toast.type === 'success' ? 'bg-gold-100 text-gold-600' : 'bg-red-50 text-red-500'"
      >
        <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-gold-800 uppercase tracking-widest">
          {{ toast.type === 'success' ? 'Completado' : 'Error' }}
        </p>
        <p class="text-sm text-slate-600 truncate leading-tight mt-1 font-bold">
          {{ toast.message }}
        </p>
      </div>
    </div>
    
    <!-- Barra de progreso interna -->
    <div class="absolute bottom-0 left-0 h-[4px] bg-gold-400 transition-all ease-linear"
      :style="{ width: `${progress}%`, transitionDuration: '2000ms' }"
    ></div>
  </div>
</template>

<style scoped>
.bg-cream-50\/95 { background-color: rgba(255, 250, 240, 0.95); }
.bg-gold-100 { background-color: #fcf4e8; }
.text-gold-600 { color: #a6844c; }
.bg-gold-400 { background-color: #d4a35c; }
.border-gold-200 { border-color: #e2c08d; }
.text-gold-800 { color: #6e572f; }
</style>
