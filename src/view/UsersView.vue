<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getUsers } from '../service/userService';
import { useToast } from '../composables/useToast';
import Loader from '../components/Loader.vue';
import UserList from '../components/UserList.vue';
import AppModal from '../components/Modal.vue';
import DeleteModal from '../components/DeleteModal.vue';
import UserForm from '../components/UserForm.vue';
import Toast from '../components/Toast.vue';
import Button from '../components/Button.vue';
import Pagination from '../components/Pagination.vue';

// --- Composable de Toasts ---
const { toasts, addToast, removeToast } = useToast();

// --- Estado Local para CRUD ---
const users = ref([]);
const loading = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const currentUser = ref({ id: null, name: '', username: '', email: '', phone: '' });
const userToDelete = ref(null);
const errors = ref({});

// --- Paginación (6 por página) ---
const currentPage = ref(1);
const itemsPerPage = 6;

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return users.value.slice(start, start + itemsPerPage);
});

// --- Persistencia Local (LocalStorage) ---
const saveToLocal = (data) => {
  localStorage.setItem('users_db', JSON.stringify(data));
};

const loadFromLocal = () => {
  const data = localStorage.getItem('users_db');
  return data ? JSON.parse(data) : null;
};

// --- Lógica de CRUD ---

const fetchUsers = async () => {
  loading.value = true;
  
  const localData = loadFromLocal();
  if (localData && localData.length > 0) {
    users.value = localData;
    loading.value = false;
    return;
  }

  try {
    const { data } = await getUsers();
    users.value = data;
    saveToLocal(data);
  } catch (error) {
    addToast('error', 'Error al sincronizar con la API');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 2. Agregar Usuario (Localmente)
const openCreateModal = () => {
  isEditing.value = false;
  currentUser.value = { id: null, name: '', username: '', email: '', phone: '' };
  errors.value = {};
  showModal.value = true;
};

// 3. Editar Usuario (Localmente)
const openEditModal = (user) => {
  isEditing.value = true;
  currentUser.value = { ...user };
  errors.value = {};
  showModal.value = true;
};

// 4. Eliminar Usuario (Localmente)
const openDeleteConfirm = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

// --- Validaciones ---
const validate = () => {
  errors.value = {};
  if (!currentUser.value.name) errors.value.name = 'El nombre es requerido';
  if (!currentUser.value.username) errors.value.username = 'El usuario es requerido';
  
  // Validación de Email: Requerido y debe contener "@"
  if (!currentUser.value.email) {
    errors.value.email = 'El email es requerido';
  } else if (!currentUser.value.email.includes('@')) {
    errors.value.email = 'El email debe contener un símbolo "@"';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentUser.value.email)) {
    errors.value.email = 'Formato de email inválido (ej: correo@ejemplo.com)';
  }

  if (!currentUser.value.phone) errors.value.phone = 'El teléfono es requerido';
  return Object.keys(errors.value).length === 0;
};

// --- Acciones Finales del CRUD ---

const saveUser = async () => {
  if (!validate()) return;

  loading.value = true;
  showModal.value = false;

  // Loader elegante de 3 segundos
  await new Promise(resolve => setTimeout(resolve, 3000));

  if (isEditing.value) {
    // Actualizar en Array Local
    const index = users.value.findIndex(u => u.id === currentUser.value.id);
    if (index !== -1) {
      users.value[index] = { ...currentUser.value };
      addToast('success', `Usuario ${currentUser.value.name} actualizado localmente`);
    }
  } else {
    // Generar ID Secuencial Automático
    const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1;
    users.value.push({ ...currentUser.value, id: newId });
    addToast('success', `Usuario ${currentUser.value.name} creado localmente`);
    
    // Mover a la página donde está el nuevo usuario
    currentPage.value = Math.ceil(users.value.length / itemsPerPage);
  }

  saveToLocal(users.value);
  loading.value = false;
};

const confirmDelete = async () => {
  if (userToDelete.value) {
    const name = userToDelete.value.name;
    const userId = userToDelete.value.id;
    
    showDeleteModal.value = false;
    loading.value = true;

    // Loader elegante de 3 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Eliminar del Array Local
    users.value = users.value.filter(u => u.id !== userId);
    saveToLocal(users.value);
    
    addToast('success', `Usuario ${name} eliminado del sistema local`);
    
    // Ajustar página si la actual queda vacía
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    }
    
    loading.value = false;
    userToDelete.value = null;
  }
};

// --- Ciclo de Vida ---
onMounted(fetchUsers);

// Observar cambios para asegurar sincronización (opcional pero robusto)
watch(users, (newVal) => {
  saveToLocal(newVal);
}, { deep: true });
</script>

<template>
  <main class="w-full min-h-screen bg-white flex flex-col p-4 md:p-8 lg:p-12">
    <Loader :show="loading" />

    <!-- Notificaciones Flotantes -->
    <div class="fixed top-8 right-8 z-[300] flex flex-col gap-4 pointer-events-none">
      <Toast 
        v-for="toast in toasts" 
        :key="toast.id" 
        v-bind="toast"
        @close="removeToast"
      />
    </div>

    <!-- Encabezado Principal -->
    <header 
      class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16"
      v-motion
      :initial="{ opacity: 0, y: -50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
    >
      <div class="space-y-3">
        <h1 class="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
          Gestión de <span class="text-gold-600 font-medium">Usuarios</span>
        </h1>
        <div class="flex items-center gap-4">
          <div class="h-[2px] w-10 bg-gold-300"></div>
          <p class="text-xs text-slate-400 uppercase tracking-[0.3em] font-bold">
            Panel Administrativo Elite | Local CRUD
          </p>
        </div>
      </div>
      
      <Button @click="openCreateModal" class="w-full md:w-auto scale-110">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span class="text-xs uppercase tracking-widest font-bold">Nuevo Usuario</span>
      </Button>
    </header>

    <!-- Sección de Tabla con Datos Locales -->
    <section class="flex-1 w-full flex flex-col">
      <UserList 
        :items="paginatedUsers" 
        @edit="openEditModal" 
        @delete="openDeleteConfirm"
      />
      
      <!-- Componente de Paginación (6 por página) -->
      <Pagination 
        v-if="totalPages > 1"
        v-model:currentPage="currentPage" 
        :totalPages="totalPages"
      />
    </section>

    <!-- Modal para Agregar/Editar -->
    <AppModal 
      :show="showModal" 
      :title="isEditing ? 'Perfeccionar Perfil Elite' : 'Nuevo Integrante Elite'" 
      @close="showModal = false"
    >
      <UserForm 
        v-model="currentUser" 
        :errors="errors" 
        @submit="saveUser" 
      />
      <template #footer>
        <button 
          @click="showModal = false"
          class="px-8 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-all"
        >
          Descartar
        </button>
        <Button @click="saveUser">
          <span class="text-xs uppercase tracking-widest">{{ isEditing ? 'Actualizar Registro' : 'Confirmar Creación' }}</span>
        </Button>
      </template>
    </AppModal>

    <DeleteModal 
      :show="showDeleteModal"
      :userName="userToDelete?.name"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </main>
</template>
