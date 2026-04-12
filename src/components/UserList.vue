<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="w-full overflow-x-auto bg-white/50 backdrop-blur-sm rounded-2xl border border-cream-300 shadow-xl shadow-cream-200/50">
    <table class="w-full border-collapse text-left">
      <thead>
        <tr class="border-b border-cream-200 bg-cream-50/50">
          <th class="px-6 py-4 text-sm font-semibold text-slate-600 tracking-tight">ID</th>
          <th class="px-6 py-4 text-sm font-semibold text-slate-600 tracking-tight">Nombre</th>
          <th class="px-6 py-4 text-sm font-semibold text-slate-600 tracking-tight">Usuario</th>
          <th class="px-6 py-4 text-sm font-semibold text-slate-600 tracking-tight">Email</th>
          <th class="px-6 py-4 text-sm font-semibold text-slate-600 tracking-tight">Teléfono</th>
          <th class="px-6 py-4 text-sm font-semibold text-slate-600 tracking-tight text-right">Acciones</th>
        </tr>
      </thead>
      <tbody v-if="items.length">
        <tr 
          v-for="(user, index) in items" 
          :key="user.id" 
          class="group border-b border-cream-100 hover:bg-gold-50/50 transition-all duration-300 animate-fade-in-left opacity-0"
          :class="`stagger-${(index % 10) + 1}`"
        >
          <td class="px-6 py-4 text-xs font-medium text-slate-400 tabular-nums">#{{ user.id }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 text-[10px] font-bold ring-2 ring-white">
                {{ user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() }}
              </div>
              <span class="text-xs font-semibold text-slate-700">{{ user.name }}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-xs text-slate-500">@{{ user.username }}</td>
          <td class="px-6 py-4 text-xs text-slate-500">{{ user.email }}</td>
          <td class="px-6 py-4 text-xs text-slate-500 font-medium">{{ user.phone }}</td>
          <td class="px-6 py-4 text-right">
            <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                @click="$emit('edit', user)"
                class="p-2 text-gold-600 hover:text-gold-700 hover:bg-gold-100 rounded-lg transition-all"
                title="Editar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <button 
                @click="$emit('delete', user)"
                class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Eliminar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6" class="px-6 py-20 text-center text-slate-400 text-xs italic">
            No se encontraron usuarios registrados
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
