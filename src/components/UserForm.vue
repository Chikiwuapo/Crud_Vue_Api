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
  <form @submit.prevent="$emit('submit')" class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Nombre</label>
      <input 
        type="text" 
        :value="modelValue.name"
        @input="$emit('update:modelValue', { ...modelValue, name: $event.target.value })"
        placeholder="Ej: John Doe"
        class="w-full px-4 py-2.5 bg-white border border-cream-400 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all shadow-sm"
        :class="{ 'border-red-400 ring-4 ring-red-500/10 focus:border-red-400': errors.name }"
      />
      <p v-if="errors.name" class="text-[11px] font-medium text-red-500 mt-0.5 ml-1">{{ errors.name }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Nombre de Usuario</label>
      <input 
        type="text" 
        :value="modelValue.username"
        @input="$emit('update:modelValue', { ...modelValue, username: $event.target.value })"
        placeholder="Ej: johndoe"
        class="w-full px-4 py-2.5 bg-white border border-cream-400 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all shadow-sm"
        :class="{ 'border-red-400 ring-4 ring-red-500/10 focus:border-red-400': errors.username }"
      />
      <p v-if="errors.username" class="text-[11px] font-medium text-red-500 mt-0.5 ml-1">{{ errors.username }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email</label>
      <input 
        type="email" 
        :value="modelValue.email"
        @input="$emit('update:modelValue', { ...modelValue, email: $event.target.value })"
        placeholder="correo@ejemplo.com"
        class="w-full px-4 py-2.5 bg-white border border-cream-400 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all shadow-sm"
        :class="{ 'border-red-400 ring-4 ring-red-500/10 focus:border-red-400': errors.email }"
      />
      <p v-if="errors.email" class="text-[11px] font-medium text-red-500 mt-0.5 ml-1">{{ errors.email }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Teléfono</label>
      <input 
        type="text" 
        :value="modelValue.phone"
        @input="$emit('update:modelValue', { ...modelValue, phone: $event.target.value })"
        placeholder="+00 000 000 000"
        class="w-full px-4 py-2.5 bg-white border border-cream-400 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all shadow-sm"
        :class="{ 'border-red-400 ring-4 ring-red-500/10 focus:border-red-400': errors.phone }"
      />
      <p v-if="errors.phone" class="text-[11px] font-medium text-red-500 mt-0.5 ml-1">{{ errors.phone }}</p>
    </div>
    
    <button type="submit" class="hidden"></button>
  </form>
</template>
