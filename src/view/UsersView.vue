<script setup>
import { ref, onMounted } from 'vue';
import { getUsers } from '../service/userService';
import Loader from '../components/Loader.vue';
import UserList from '../components/UserList.vue';
import AppModal from '../components/Modal.vue';
import DeleteModal from '../components/DeleteModal.vue';
import UserForm from '../components/UserForm.vue';
import Toast from '../components/Toast.vue';

// State
const users = ref([]);
const loading = ref(false);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const currentUser = ref({ id: null, name: '', username: '', email: '', phone: '' });
const userToDelete = ref(null);
const errors = ref({});
const toasts = ref([]);

// Toast Helper
const addToast = (type, message) => {
  const id = Date.now();
  toasts.value.push({ id, type, message });
};

const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id);
};

// Logic
const fetchUsers = async () => {
  loading.value = true;
  try {
    const { data } = await getUsers();
    users.value = data;
  } catch (error) {
    addToast('error', 'No se pudieron cargar los usuarios');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  currentUser.value = { id: null, name: '', username: '', email: '', phone: '' };
  errors.value = {};
  showModal.value = true;
};

const openEditModal = (user) => {
  isEditing.value = true;
  currentUser.value = { ...user };
  errors.value = {};
  showModal.value = true;
};

const openDeleteConfirm = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const validate = () => {
  errors.value = {};
  if (!currentUser.value.name) errors.value.name = 'El nombre es requerido';
  if (!currentUser.value.username) errors.value.username = 'El usuario es requerido';
  if (!currentUser.value.email) {
    errors.value.email = 'El email es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentUser.value.email)) {
    errors.value.email = 'Formato de email inválido';
  }
  if (!currentUser.value.phone) errors.value.phone = 'El teléfono es requerido';
  return Object.keys(errors.value).length === 0;
};

const saveUser = () => {
  if (!validate()) return;

  if (isEditing.value) {
    const index = users.value.findIndex(u => u.id === currentUser.value.id);
    if (index !== -1) {
      users.value[index] = { ...currentUser.value };
      addToast('success', `Usuario ${currentUser.value.name} actualizado`);
    }
  } else {
    const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1;
    users.value.push({ ...currentUser.value, id: newId });
    addToast('success', `Usuario ${currentUser.value.name} creado`);
  }
  showModal.value = false;
};

const confirmDelete = () => {
  if (userToDelete.value) {
    const name = userToDelete.value.name;
    users.value = users.value.filter(u => u.id !== userToDelete.value.id);
    addToast('success', `Usuario ${name} eliminado`);
    showDeleteModal.value = false;
    userToDelete.value = null;
  }
};

onMounted(fetchUsers);
</script>

<template>
  <main class="w-full min-h-screen bg-cream-100 flex flex-col p-4 md:p-8">
    <Loader :show="loading" />

    <!-- Toast Container -->
    <div class="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <Toast 
        v-for="toast in toasts" 
        :key="toast.id" 
        :toast="toast" 
        @close="removeToast"
      />
    </div>

    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in-down">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Gestión de Usuarios</h1>
        <p class="text-xs text-slate-500 mt-1 font-medium">Panel de administración moderno y fluido</p>
      </div>
      <button 
        @click="openCreateModal"
        class="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-500/20 transition-all active:scale-95"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Añadir Nuevo Usuario
      </button>
    </header>

    <!-- Table Section -->
    <section class="flex-1 w-full">
      <UserList 
        :items="users" 
        @edit="openEditModal" 
        @delete="openDeleteConfirm"
      />
    </section>

    <!-- Modals -->
    <AppModal 
      :show="showModal" 
      :title="isEditing ? 'Editar Usuario' : 'Nuevo Usuario'" 
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
          class="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
        >
          Cancelar
        </button>
        <button 
          @click="saveUser"
          class="px-5 py-2 text-xs font-bold bg-gold-500 hover:bg-gold-600 text-white rounded-xl shadow-md shadow-gold-500/10 transition-all active:scale-95"
        >
          Guardar Cambios
        </button>
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
