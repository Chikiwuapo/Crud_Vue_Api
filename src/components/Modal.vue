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
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <div 
      v-if="show" 
      class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <div class="w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl border border-gold-100/50 overflow-hidden flex flex-col max-h-[90vh]">
        <div class="flex items-center justify-between px-12 py-10 border-b border-gold-50">
          <div class="space-y-2">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">{{ title }}</h2>
            <div class="h-[3px] w-8 bg-gold-300"></div>
          </div>
          <button 
            @click="$emit('close')"
            class="p-2 text-slate-300 hover:text-gold-500 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto px-12 py-10 bg-cream-50/20">
          <slot></slot>
        </div>
        
        <div class="px-12 py-8 bg-white border-t border-gold-50 flex justify-end items-center gap-8">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.bg-cream-50\/20 { background-color: rgba(fffaf0, 0.2); }
.border-gold-100\/50 { border-color: rgba(226, 192, 141, 0.5); }
.border-gold-50 { border-color: #fcf4e8; }
.bg-gold-300 { background-color: #e2c08d; }
</style>
