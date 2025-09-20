# TodoApp Backend

Backend para una aplicación simple de gestión de tareas desarrollado como parte del curso de **Desarrollo y Soporte de Aplicaciones Multiplataforma (DSAM)** en **Certus**.

## 📋 Descripción

Este proyecto es la primera versión del backend para una aplicación de gestión de tareas (TodoApp), implementado utilizando las tecnologías aprendidas en la **Sesión 3** del curso DSAM.
Se añadirá nuevas versiones según las sesiones de clase.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **Firebase Admin SDK** - Para gestión de base de datos y autenticación
- **Firestore** - Base de datos NoSQL de Firebase
- **ES6 Modules** - Sistema de módulos moderno de JavaScript

## 🚀 Características

- ✅ Crear tareas
- ✅ Listar tareas por usuario
- ✅ Actualizar tareas
- ✅ Eliminar tareas
- 🔐 Gestión de usuarios con Firebase

## 📁 Estructura del Proyecto

```
src/
├── config/
│   └── firebase.config.js    # Configuración de Firebase
├── controllers/
│   └── tasks.controller.js   # Controladores de tareas
├── routes/
│   └── tasks.routes.js       # Rutas de la API
├── services/
│   └── tasks.service.js      # Lógica de negocio
└── index.js                  # Punto de entrada de la aplicación
```

## 🏃‍♂️ Instalación y Uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Firebase:**
   - Coloca tu archivo `firebase-key.json` en la carpeta `src/`
   - Configura las variables de entorno si es necesario

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **El servidor estará disponible en:**
   ```
   http://localhost:3000
   ```

## 📚 API Endpoints

- `GET /api/tasks/:userId` - Obtener tareas de un usuario
- `POST /api/tasks/:userId` - Crear nueva tarea
- `PUT /api/tasks/:userId/:taskId` - Actualizar tarea
- `DELETE /api/tasks/:userId/:taskId` - Eliminar tarea

## 📖 Versión

**v1.0.0** - Primera versión con tecnologías de la Sesión 3 del curso DSAM

---

*Desarrollado como parte del curso de Desarrollo y Soporte de Aplicaciones Multiplataforma en Certus*