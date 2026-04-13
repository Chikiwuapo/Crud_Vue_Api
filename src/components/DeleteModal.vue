<script setup>
import Button from './Button.vue';

defineProps({
  show: Boolean,
  userName: String
});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="show" class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm">
      <div class="w-full max-w-md overflow-hidden bg-white rounded-[2.5rem] shadow-2xl border border-gold-100">
        <div class="p-10 text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-8 bg-red-50 rounded-full border border-red-100">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="mb-4 text-xl font-bold text-slate-800 tracking-tight">¿Eliminar registro?</h3>
          <p class="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest">
            Confirmar la remoción de <span class="text-slate-900 font-extrabold underline decoration-gold-200">{{ userName }}</span> de la base de datos elite.
          </p>
        </div>
        <div class="flex items-center gap-6 p-8 bg-gold-50/30 border-t border-gold-50">
          <button 
            @click="$emit('cancel')"
            class="flex-1 px-6 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-all"
          >
            Preservar
          </button>
          <button 
            @click="$emit('confirm')"
            class="flex-1 px-6 py-3 text-xs font-bold text-white bg-red-400 hover:bg-red-500 rounded-full shadow-lg shadow-red-100 transition-all active:scale-95 uppercase tracking-widest"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
