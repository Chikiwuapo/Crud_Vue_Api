<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:currentPage']);

const pages = computed(() => {
  const range = [];
  for (let i = 1; i <= props.totalPages; i++) {
    range.push(i);
  }
  return range;
});

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};
</script>

<template>
  <nav class="flex items-center justify-center gap-2 mt-12 py-4">
    <button 
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="p-2 text-gold-600 hover:text-gold-700 hover:bg-gold-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-all duration-300 group"
      title="Anterior"
    >
      <svg class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <div class="flex items-center gap-1.5 px-4">
      <button 
        v-for="page in pages" 
        :key="page"
        @click="changePage(page)"
        class="min-w-[36px] h-9 flex items-center justify-center text-xs font-bold rounded-full transition-all duration-300"
        :class="currentPage === page 
          ? 'bg-gold-500 text-white shadow-md shadow-gold-500/20' 
          : 'text-slate-400 hover:text-gold-600 hover:bg-gold-50'"
      >
        {{ page }}
      </button>
    </div>

    <button 
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="p-2 text-gold-600 hover:text-gold-700 hover:bg-gold-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-all duration-300 group"
      title="Siguiente"
    >
      <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.text-gold-600 { color: #a6844c; }
.text-gold-700 { color: #8a6d3b; }
.bg-gold-50 { background-color: #fcf4e8; }
.bg-gold-500 { background-color: #d4a35c; }
</style>
