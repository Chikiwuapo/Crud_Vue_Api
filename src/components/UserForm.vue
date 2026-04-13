<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  }
});

defineEmits(['update:modelValue', 'submit']);
</script>

<template>
  <form @submit.prevent="$emit('submit')" class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
    <div class="flex flex-col gap-3">
      <label class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Nombre Completo</label>
      <input 
        type="text" 
        :value="modelValue.name"
        @input="$emit('update:modelValue', { ...modelValue, name: $event.target.value })"
        placeholder="Ej: John Doe"
        class="w-full px-6 py-4 bg-white border border-gold-100 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-300 transition-all shadow-sm"
        :class="{ 'border-red-300 ring-4 ring-red-500/5 focus:border-red-400': errors.name }"
      />
      <p v-if="errors.name" class="text-xs font-bold text-red-400 mt-1 ml-1 uppercase tracking-wider">{{ errors.name }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <label class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Alias de Usuario</label>
      <input 
        type="text" 
        :value="modelValue.username"
        @input="$emit('update:modelValue', { ...modelValue, username: $event.target.value })"
        placeholder="Ej: johndoe"
        class="w-full px-6 py-4 bg-white border border-gold-100 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-300 transition-all shadow-sm"
        :class="{ 'border-red-300 ring-4 ring-red-500/5 focus:border-red-400': errors.username }"
      />
      <p v-if="errors.username" class="text-xs font-bold text-red-400 mt-1 ml-1 uppercase tracking-wider">{{ errors.username }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <label class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Dirección de Email</label>
      <input 
        type="email" 
        :value="modelValue.email"
        @input="$emit('update:modelValue', { ...modelValue, email: $event.target.value })"
        placeholder="correo@ejemplo.com"
        class="w-full px-6 py-4 bg-white border border-gold-100 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-300 transition-all shadow-sm"
        :class="{ 'border-red-300 ring-4 ring-red-500/5 focus:border-red-400': errors.email }"
      />
      <p v-if="errors.email" class="text-xs font-bold text-red-400 mt-1 ml-1 uppercase tracking-wider">{{ errors.email }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <label class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Teléfono de Contacto</label>
      <input 
        type="text" 
        :value="modelValue.phone"
        @input="$emit('update:modelValue', { ...modelValue, phone: $event.target.value })"
        placeholder="+00 000 000 000"
        class="w-full px-6 py-4 bg-white border border-gold-100 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-300 transition-all shadow-sm"
        :class="{ 'border-red-300 ring-4 ring-red-500/5 focus:border-red-400': errors.phone }"
      />
      <p v-if="errors.phone" class="text-xs font-bold text-red-400 mt-1 ml-1 uppercase tracking-wider">{{ errors.phone }}</p>
    </div>
    
    <button type="submit" class="hidden"></button>
  </form>
</template>

<style scoped>
.border-gold-100 { border-color: #fcf4e8; }
.focus\:border-gold-300:focus { border-color: #e2c08d; }
</style>
