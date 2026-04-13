# 🚀 Elite User Management System (CRUD)

Este proyecto es una plataforma de gestión de usuarios de alto nivel, diseñada con un enfoque **minimalista, moderno y elegante**. Ha sido desarrollado utilizando **Vue 3 (Composition API)**, **Tailwind CSS** y **@vueuse/motion** para ofrecer una experiencia de usuario fluida y reactiva.

---

## 🛠️ Stack Tecnológico

- **Framework**: Vue 3.5+ (Composition API con `<script setup>`)
- **Estilizado**: Tailwind CSS 4.0+ (Utilizando configuración de colores personalizados: oro, crema, pizarra)
- **Animaciones**: `@vueuse/motion` (Entradas staggered, transiciones de salida y efectos spring)
- **Estado y Reactividad**: Vue Reactivity API (`ref`, `computed`, `watch`)
- **Routing**: Vue Router 4
- **Cliente HTTP**: Axios

---

## 🏗️ Arquitectura y Patrones

El proyecto sigue una arquitectura modular basada en componentes atómicos y de propósito específico para asegurar la escalabilidad y mantenibilidad.

### 1. Consumo de API y Sincronización
La comunicación con el exterior se centraliza en [userService.js](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/service/userService.js). 

- **Estrategia de Hidratación**: El sistema implementa una lógica de "hidratación local". Al iniciar, verifica la existencia de datos en la persistencia local. Si el almacén está vacío, realiza un `GET` único a la API de JSONPlaceholder para obtener la base inicial.
- **Peticiones**: Solo se realiza la petición de obtención inicial. Las operaciones de escritura (POST, PUT, DELETE) se gestionan localmente para cumplir con el requerimiento de "CRUD Local Persistente".

### 2. Persistencia y Manejo de Estado
El estado global de la aplicación se maneja de forma reactiva en la vista principal [UsersView.vue](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/view/UsersView.vue), pero se sincroniza automáticamente con el almacenamiento del navegador.

- **Almacenamiento**: Se utiliza `localStorage` bajo la llave `users_db`.
- **Sincronización**: Se implementa un `watch` profundo sobre el array de usuarios para persistir cualquier cambio (creación, edición o borrado) de forma transparente.
- **Generación de IDs**: Para nuevos registros, se utiliza un algoritmo de búsqueda del ID máximo actual + 1, garantizando la integridad de la secuencia numérica.

### 3. Sistema de Componentes Reutilizables
Se han diseñado componentes desacoplados de la lógica de negocio, comunicándose mediante **Props y Emits**:

- **[Button.vue](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/components/Button.vue)**: Componente base de UI con estados hover/active y slots para iconos/texto.
- **[Modal.vue](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/components/Modal.vue)**: Wrapper genérico para diálogos, con transiciones de entrada/salida y slots para header, body y footer.
- **[Toast.vue](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/components/Toast.vue)**: Sistema de notificaciones tipo cápsula con barra de progreso interna de 2 segundos.
- **[Pagination.vue](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/components/Pagination.vue)**: Lógica de navegación segmentada (6 ítems por página).
- **[UserList.vue](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/components/UserList.vue)**: Tabla responsiva con animaciones de entrada staggered para las filas.

---

## 🚦 Enrutamiento (Routing)

Se utiliza un sistema de rutas simple pero extensible definido en [index.js](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/Router/index.js):

- `/`: Redirección automática a la vista de usuarios.
- `/users`: Vista principal del CRUD con carga perezosa (Lazy Loading) del componente para optimizar el bundle inicial.

---

## 💡 Decisiones Técnicas Destacables

- **Validación de Datos**: Se implementó una capa de validación manual antes del commit al estado local, asegurando que el email contenga el símbolo `@` y tenga un formato válido, además de campos requeridos.
- **User Experience (UX)**: Se introdujo un retardo artificial de 3 segundos (utilizando `Promises` y `setTimeout`) en las operaciones de escritura. Esto permite que el usuario visualice el [Loader.vue](file:///c:/Users/favio/Desktop/Proyectos Pago/crud_api/src/components/Loader.vue) "Elite", aportando una sensación de robustez y procesamiento seguro.
- **Responsividad**: La interfaz utiliza contenedores de desbordamiento horizontal en tablas y grids adaptables para garantizar una experiencia óptima desde dispositivos móviles hasta monitores UltraWide.

---

## 🚀 Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Iniciar entorno de desarrollo: `npm run dev`
4. Compilar para producción: `npm run build`

---

Desarrollado con enfoque en la excelencia técnica y visual. 🥂
