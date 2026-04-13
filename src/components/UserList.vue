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
  <div class="w-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-gold-100/50 shadow-sm overflow-hidden">
    <div class="overflow-x-auto custom-scrollbar">
      <table class="w-full border-collapse text-left min-w-[700px] md:min-w-[800px]">
        <thead>
          <tr class="border-b border-gold-50 bg-cream-50/30">
            <th class="px-4 md:px-8 py-6 text-xs font-bold text-gold-800 uppercase tracking-[0.2em]">ID</th>
            <th class="px-4 md:px-8 py-6 text-xs font-bold text-gold-800 uppercase tracking-[0.2em]">Perfil</th>
            <th class="px-4 md:px-8 py-6 text-xs font-bold text-gold-800 uppercase tracking-[0.2em]">Usuario</th>
            <th class="px-4 md:px-8 py-6 text-xs font-bold text-gold-800 uppercase tracking-[0.2em]">Email</th>
            <th class="px-4 md:px-8 py-6 text-xs font-bold text-gold-800 uppercase tracking-[0.2em]">Contacto</th>
            <th class="px-4 md:px-8 py-6 text-xs font-bold text-gold-800 uppercase tracking-[0.2em] text-right">Acciones</th>
          </tr>
        </thead>
        <TransitionGroup 
          tag="tbody"
          :css="false"
          v-if="items.length"
        >
          <tr 
            v-for="(user, index) in items" 
            :key="user.id" 
            class="group border-b border-gold-50/50 hover:bg-cream-50/50 transition-colors duration-500"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ 
              opacity: 1, 
              x: 0, 
              transition: { 
                delay: index * 50,
                duration: 500,
                ease: 'easeOut'
              } 
            }"
            :leave="{ 
              opacity: 0, 
              x: 100, 
              transition: { 
                duration: 400,
                ease: 'easeIn'
              } 
            }"
          >
            <td class="px-4 md:px-8 py-6 text-xs font-medium text-slate-400 tabular-nums">
              <span class="opacity-50">#</span>{{ user.id }}
            </td>
            <td class="px-4 md:px-8 py-6">
              <div class="flex items-center gap-3 md:gap-4">
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-gold-200 flex items-center justify-center text-gold-700 text-[10px] md:text-xs font-bold shadow-sm group-hover:shadow-md transition-shadow">
                  {{ user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() }}
                </div>
                <span class="text-xs md:text-sm font-bold text-slate-700 tracking-tight">{{ user.name }}</span>
              </div>
            </td>
            <td class="px-4 md:px-8 py-6 text-xs md:text-sm text-slate-500 font-medium">@{{ user.username }}</td>
            <td class="px-4 md:px-8 py-6 text-xs md:text-sm text-slate-500">{{ user.email }}</td>
            <td class="px-4 md:px-8 py-6 text-xs md:text-sm text-slate-500 font-medium whitespace-nowrap">{{ user.phone }}</td>
            <td class="px-4 md:px-8 py-6 text-right">
              <div class="flex items-center justify-end gap-2 md:gap-4 transition-all duration-300">
                <button 
                  @click="$emit('edit', user)"
                  class="p-2 md:p-3 text-gold-600 hover:text-gold-700 hover:bg-white hover:shadow-md border border-transparent hover:border-gold-100 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95"
                  title="Editar"
                >
                  <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button 
                  @click="$emit('delete', user)"
                  class="p-2 md:p-3 text-red-400 hover:text-red-500 hover:bg-white hover:shadow-md border border-transparent hover:border-red-50 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95"
                  title="Eliminar"
                >
                  <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </TransitionGroup>
        <tbody v-else>
          <tr>
            <td colspan="6" class="px-8 py-32 text-center">
              <div class="flex flex-col items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center text-gold-300">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">No hay usuarios en la base elite</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
