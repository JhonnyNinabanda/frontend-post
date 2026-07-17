# Frontend - Aplicación Web React

## Descripción

Aplicación web desarrollada con React, TypeScript y Vite para la gestión de las entidades:

- Users
- Posts
- Comments
- Albums
- Photos
- Todos

La aplicación consume la API REST desarrollada en Helidon 4.5 mediante Axios y utiliza Redux Toolkit para la gestión del estado global.

---

# Tecnologías Utilizadas

| Tecnología | Versión |
|------------|----------|
| React | COMPLETAR |
| TypeScript | COMPLETAR |
| Vite | COMPLETAR |
| React Router DOM | COMPLETAR |
| Redux Toolkit | COMPLETAR |
| Axios | COMPLETAR |
| Material UI | COMPLETAR |

---

# Arquitectura del Proyecto

```text
src

├── api
│   └── api.ts
│
├── app
│   ├── store.ts
│   └── hooks.ts
│
├── components
│   ├── Navbar.tsx
│   └── AppSnackbar.tsx
│
├── features
│   ├── users
│   │   ├── usersSlice.ts
│   │   └── usersTypes.ts
│   │
│   ├── posts
│   │
│   ├── comments
│   │
│   ├── albums
│   │
│   ├── photos
│   │
│   └── todos
│
├── pages
│   ├── UsersPage.tsx
│   ├── PostsPage.tsx
│   ├── CommentsPage.tsx
│   ├── AlbumsPage.tsx
│   ├── PhotosPage.tsx
│   └── TodosPage.tsx
│
├── routes
│
├── App.tsx
│
└── main.tsx
```

---

# Funcionalidades Implementadas

## Users

- Listar usuarios
- Crear usuario
- Editar usuario
- Eliminar usuario

## Posts

- Listar posts
- Crear post
- Editar post
- Eliminar post

## Comments

- Listar comentarios
- Crear comentario
- Editar comentario
- Eliminar comentario

## Albums

- Listar álbumes
- Crear álbum
- Editar álbum
- Eliminar álbum

## Photos

- Listar fotos
- Crear foto
- Editar foto
- Eliminar foto

## Todos

- Listar tareas
- Crear tarea
- Editar tarea
- Eliminar tarea

---

# Gestión de Estado

La aplicación utiliza Redux Toolkit para administrar el estado global.

Slices implementados:

```text
usersSlice

```

---

# Navegación

Se implementó React Router para la navegación entre páginas.

Rutas configuradas:

```text
/
```

Dashboard principal.

```text
/users
```

Gestión de usuarios.

```text
/posts
```

Gestión de posts.

```text
/comments
```

Gestión de comentarios.

```text
/albums
```

Gestión de álbumes.

```text
/photos
```

Gestión de fotos.

```text
/todos
```

Gestión de tareas.

---

# Comunicación con el Backend

La aplicación utiliza Axios para consumir la API REST.

Archivo:

```text
src/api/api.ts
```

Configuración:

```typescript
const api = axios.create({
    baseURL: "/api",
});
```

---

# Proxy de Desarrollo

Configurado en:

```text
vite.config.ts
```

Redirección:

```text
/api
      ↓
http://localhost:8080
```

Permite consumir la API Helidon sin problemas de CORS durante el desarrollo.

---

# Flujo de la Aplicación

```text
Usuario
    ↓
React
    ↓
Redux Toolkit
    ↓
Axios
    ↓
Vite Proxy
    ↓
Helidon API
    ↓
PostgreSQL
```

---

# Interfaz de Usuario

La interfaz se desarrolló utilizando Material UI.

Componentes principales:

```text
AppBar
Toolbar
Button
Dialog
TextField
Table
Paper
Snackbar
CircularProgress
```

Características:

```text
- Navegación superior
- Formularios modales
- Tablas de datos
- Validaciones visuales
- Notificaciones Snackbar
- Indicadores de carga
```

---

# Validaciones Implementadas

## Users

Validación de:

```text
Nombre obligatorio
Usuario obligatorio
Email obligatorio
Formato correcto de email
```

Mensajes mostrados mediante Snackbar.

---

# Manejo de Errores

La aplicación captura errores provenientes del backend y muestra mensajes amigables al usuario mediante Snackbar.

Ejemplo:

```text
Usuario creado correctamente
Usuario actualizado correctamente
Error al crear usuario
Error al eliminar usuario
```

---

# Integración con Backend Helidon

La aplicación consume los siguientes endpoints:

```text
/api/users
/api/posts
/api/comments
/api/albums
/api/photos
/api/todos
```

Operaciones soportadas:

```text
GET
POST
PUT
DELETE
```

Total:

```text
30 endpoints REST
```

---

# Compilación

Instalar dependencias:

```bash
npm install
```

Generar build de producción:

```bash
npm run build
```

---

# Ejecución

Modo desarrollo:

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:5173
```

---

# Requisitos

```text
Node.js
npm
Backend Helidon ejecutándose en localhost:8080
```

---

# Orden de Arranque

1. PostgreSQL
2. Backend Helidon

```bash
gradlew run
```

3. Frontend React

```bash
npm run dev
```

---

# Autor

**JHONNY EDUARDO NINABANDA PAMBABAY**
