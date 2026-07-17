# Frontend - Aplicación Web React

## Descripción

Aplicación web desarrollada con React, TypeScript y Vite para la gestión de las entidades:

- Users
- Posts
- Comments
- Albums
- Photos
- Todos

La aplicación consume la API REST desarrollada en Helidon 4.5 mediante Axios y utiliza Redux Toolkit para la administración del estado global.

---

# Tecnologías Utilizadas

| Tecnología | Versión |
|------------|----------|
| React | 19.2.7 |
| React DOM | 19.2.7 |
| TypeScript | 6.0.2 |
| Vite | 8.1.1 |
| React Router DOM | 7.18.1 |
| Redux Toolkit | 2.12.0 |
| React Redux | 9.3.0 |
| Axios | 1.18.1 |
| Material UI | 9.2.0 |
| Emotion React | 11.14.0 |
| Emotion Styled | 11.14.1 |

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

Cada slice administra:

- Estado global
- Acciones
- Async Thunks
- Consumo de API
- Manejo de carga
- Actualización de datos

---

# Navegación

La aplicación utiliza React Router DOM.

Rutas implementadas:

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

Gestión de publicaciones.

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

La aplicación consume los servicios REST mediante Axios.

Archivo de configuración:

```text
src/api/api.tsx
```

Configuración:

```typescript
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

export default api;
```

---

# Configuración Proxy Vite

La aplicación utiliza un proxy para comunicarse con el backend Helidon.

Archivo:

```text
vite.config.ts
```

Configuración:

```typescript
server: {
    proxy: {
        "/api": {
            target: "http://localhost:8080",
            changeOrigin: true,
        },
    },
}
```

Redirección:

```text
/api
      ↓
http://localhost:8080
```

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

Se desarrolló utilizando Material UI.

Componentes utilizados:

- AppBar
- Toolbar
- Button
- Dialog
- DialogTitle
- DialogContent
- DialogActions
- TextField
- Table
- TableHead
- TableBody
- TableRow
- TableCell
- Paper
- Snackbar
- CircularProgress
- Container
- Typography

---

# Validaciones Implementadas

## Users

Validación de:

- Nombre obligatorio
- Usuario obligatorio
- Email obligatorio
- Formato válido de email

Mensajes mostrados mediante Snackbar.

---

# Manejo de Notificaciones

La aplicación utiliza el componente:

```text
AppSnackbar
```

para mostrar mensajes de éxito, advertencia e error.

Ejemplos:

```text
Usuario creado correctamente
Usuario actualizado correctamente
Usuario eliminado correctamente

Error al crear usuario
Error al eliminar usuario
```

---

# Integración con Backend Helidon

La aplicación consume los siguientes recursos REST:

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

Total consumido:

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

Aplicación disponible en:

```text
http://localhost:5173
```

---

# Requisitos

- Node.js
- npm
- Backend Helidon ejecutándose en localhost:8080
- PostgreSQL ejecutándose

---

# Orden Correcto de Arranque

## 1. Iniciar PostgreSQL

Verificar que la base de datos se encuentre disponible.

## 2. Ejecutar Backend

```bash
cd backend

gradlew run
```

Servidor:

```text
http://localhost:8080
```

## 3. Ejecutar Frontend

```bash

npm install

npm run dev
```

Aplicación:

```text
http://localhost:5173
```

---

# Estructura del Proyecto

```text
frontend-post

├── public
│
├── src
│   ├── api
│   ├── app
│   ├── components
│   ├── features
│   ├── pages
│   └── routes
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# Autor

**JHONNY EDUARDO NINABANDA PAMBABAY**
