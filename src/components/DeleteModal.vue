<script setup>
defineProps({
  show: Boolean,
  userName: String
});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <Transition
    enter-active-class="animate-zoom-in"
    leave-active-class="animate-zoom-out"
  >
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="w-full max-w-sm overflow-hidden bg-white rounded-2xl shadow-2xl border border-cream-400">
        <div class="p-6 text-center">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-50 rounded-full">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-slate-800">¿Eliminar usuario?</h3>
          <p class="text-sm text-slate-500">
            Esta acción eliminará definitivamente a <span class="font-semibold text-slate-700">{{ userName }}</span>. Esta acción no se puede deshacer.
          </p>
        </div>
        <div class="flex items-center gap-3 p-4 bg-slate-50">
          <button 
            @click="$emit('cancel')"
            class="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button 
            @click="$emit('confirm')"
            class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 border border-red-600 rounded-xl hover:bg-red-600 shadow-sm transition-colors shadow-red-200"
          >
            Eliminar Definitivamente
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
