<template>
  <button 
    class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gold-200 text-gold-700 text-xs font-bold rounded-full shadow-sm hover:bg-cream-50 hover:border-gold-300 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.bg-cream-50 {
  background-color: #fffaf0;
}
.border-gold-200 {
  border-color: #e2c08d;
}
.border-gold-300 {
  border-color: #d4a35c;
}
.text-gold-700 {
  color: #8a6d3b;
}
</style>
