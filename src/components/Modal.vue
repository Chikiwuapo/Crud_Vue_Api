<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
});

defineEmits(['close']);
</script>

<template>
  <Transition
    enter-active-class="animate-zoom-in"
    leave-active-class="animate-zoom-out"
  >
    <div 
      v-if="show" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-cream-400 overflow-hidden flex flex-col max-h-[90vh]">
        <div class="flex items-center justify-between p-5 border-b border-cream-200">
          <h2 class="text-lg font-semibold text-slate-800 tracking-tight">{{ title }}</h2>
          <button 
            @click="$emit('close')"
            class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            aria-label="Cerrar modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 bg-cream-50/30">
          <slot></slot>
        </div>
        
        <div class="p-4 bg-slate-50/80 border-t border-cream-200 flex justify-end gap-3">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
