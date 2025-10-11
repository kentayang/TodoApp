# TodoApp Backend

Backend para una aplicación de gestión de tareas con autenticación desarrollado como parte del curso de **Desarrollo y Soporte de Aplicaciones Multiplataforma (DSAM)** en **Certus**.

## 📋 Descripción

Este proyecto es un backend completo para una aplicación de gestión de tareas (TodoApp) que implementa autenticación de usuarios y gestión de tareas. Está diseñado como material educativo para estudiantes de desarrollo, demostrando las mejores prácticas en arquitectura de APIs REST.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **Firebase Admin SDK** - Para gestión de base de datos y autenticación con Google
- **Firestore** - Base de datos NoSQL de Firebase
- **JWT (jsonwebtoken)** - Para autenticación basada en tokens
- **bcrypt** - Para encriptación de contraseñas
- **Zod** - Para validación de esquemas
- **cookie-parser** - Para manejo de cookies HTTP
- **ES6 Modules** - Sistema de módulos moderno de JavaScript

## 🚀 Características

### Autenticación
- ✅ Registro de usuarios con email y contraseña
- ✅ Login con email y contraseña
- ✅ Autenticación con Google (Firebase Auth)
- ✅ Tokens JWT para sesiones seguras
- ✅ Logout de usuarios
- ✅ Middleware de protección de rutas

### Gestión de Tareas
- ✅ Crear tareas
- ✅ Listar tareas por usuario autenticado
- ✅ Actualizar tareas
- ✅ Eliminar tareas
- ✅ Las tareas están vinculadas al usuario autenticado

## 📁 Estructura del Proyecto

```
src/
├── config/
│   └── firebase.config.js       # Configuración de Firebase Admin
├── controllers/
│   ├── auth.controller.js       # Controladores de autenticación
│   └── tasks.controller.js      # Controladores de tareas
├── middlewares/
│   └── auth.middleware.js       # Middleware de verificación JWT
├── routes/
│   ├── auth.routes.js           # Rutas de autenticación
│   └── tasks.routes.js          # Rutas de tareas
├── services/
│   ├── auth.service.js          # Lógica de negocio de autenticación
│   └── tasks.service.js         # Lógica de negocio de tareas
├── schema/
│   └── auth.schema.js           # Esquemas de validación con Zod
├── utils/
│   └── jwt.utils.js             # Utilidades para JWT
├── firebase-key.json            # Credenciales de Firebase (no incluir en git)
└── index.js                     # Punto de entrada de la aplicación
```

## 🏃‍♂️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd TodoApp-backend
```

### 2. Instalar dependencias
   ```bash
   npm install
   ```

### 3. Configurar Firebase

#### a) Crear proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita Firestore Database

#### b) Obtener credenciales de Firebase Admin
1. En Firebase Console, ve a **Configuración del proyecto** (ícono de engranaje)
2. Ve a la pestaña **Cuentas de servicio**
3. Haz clic en **Generar nueva clave privada**
4. Guarda el archivo JSON descargado como `firebase-key.json` en la carpeta `src/`

#### c) Configurar Firebase Authentication (para Google Auth)
1. En Firebase Console, ve a **Authentication** → **Sign-in method**
2. Habilita el proveedor **Correo electrónico/contraseña**
3. Habilita el proveedor **Google**
4. Añade `localhost` a los dominios autorizados (para desarrollo)

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura
NODE_ENV=development
```

> **Importante:** Cambia `JWT_SECRET` por una cadena aleatoria y segura en producción.

### 5. Ejecutar la aplicación

**Modo desarrollo:**
   ```bash
   npm run dev
   ```

El servidor estará disponible en: `http://localhost:3000`

## 📚 API Endpoints

### Autenticación

#### Registro de usuario
```http
POST /auth/register
Content-Type: application/json

{
	"name": "Juan Pérez",
	"email": "juan@example.com",
	"password": "password123",
	"confirmPassword": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
	"user": {
		"userId": "abc123",
		"email": "juan@example.com",
		"name": "Juan Pérez"
	}
}
```

#### Login con email/password
```http
POST /auth/login
Content-Type: application/json

{
	"email": "juan@example.com",
	"password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
	"message": "Login successful",
	"user": {
		"userId": "abc123",
		"email": "juan@example.com",
		"name": "Juan Pérez"
	}
}
```

> **Nota:** El token JWT se envía como cookie HTTP-only llamada `accessToken`

#### Login con Google
```http
POST /auth/google
Content-Type: application/json

{
	"idToken": "token_de_google_desde_firebase_auth"
}
```

**Flujo de autenticación con Google:**
1. El frontend usa Firebase Auth para autenticar con Google
2. Obtiene el `idToken` del usuario autenticado
3. Envía el `idToken` al backend
4. El backend lo valida y crea/busca el usuario
5. Retorna un JWT propio en una cookie

**Respuesta exitosa (200):**
```json
{
	"message": "Login successful",
	"user": {
		"userId": "abc123",
		"email": "juan@gmail.com",
		"name": "Juan Pérez"
	}
}
```

#### Logout
```http
POST /auth/logout
```

**Respuesta exitosa (200):**
```json
{
	"message": "Logout successful"
}
```

### Tareas (requieren autenticación)

> **Nota:** Todas las rutas de tareas requieren que el usuario esté autenticado. El token JWT debe estar presente en las cookies.

#### Crear tarea
```http
POST /tasks
Content-Type: application/json
Cookie: accessToken=<jwt_token>

{
	"title": "Completar proyecto",
	"completed": false
}
```

**Respuesta exitosa (200):**
```json
{
	"task": {
		"id": "task123",
		"title": "Completar proyecto",
		"completed": false
	}
}
```

#### Obtener todas las tareas del usuario
```http
GET /tasks
Cookie: accessToken=<jwt_token>
```

**Respuesta exitosa (200):**
```json
{
	"tasks": [
		{
			"id": "task123",
			"title": "Completar proyecto",
			"completed": false
		},
		{
			"id": "task456",
			"title": "Estudiar Node.js",
			"completed": true
		}
	]
}
```

#### Actualizar tarea
```http
PUT /tasks/:taskId
Content-Type: application/json
Cookie: accessToken=<jwt_token>

{
	"title": "Completar proyecto (actualizado)",
	"completed": true
}
```

**Respuesta exitosa (200):**
```json
{
	"message": "Task updated successfully",
	"task": {
		"id": "task123",
		"title": "Completar proyecto (actualizado)",
		"completed": true
	}
}
```

#### Eliminar tarea
```http
DELETE /tasks/:taskId
Cookie: accessToken=<jwt_token>
```

**Respuesta exitosa (200):**
```json
{
	"message": "Task deleted successfully"
}
```

## 🔐 Autenticación y Seguridad

### Sistema de Autenticación

Este proyecto implementa un sistema de autenticación híbrido:

1. **Email/Password:** Autenticación tradicional con contraseñas hasheadas usando bcrypt
2. **Google OAuth:** Autenticación mediante Firebase Authentication

Ambos métodos generan el mismo tipo de JWT para mantener la consistencia en el sistema.

### Funcionamiento del JWT

1. Cuando un usuario se autentica (por cualquier método), el servidor genera un JWT
2. El JWT se envía al cliente como una cookie HTTP-only (más segura que localStorage)
3. En cada petición a rutas protegidas, el middleware `verifyToken` valida el JWT
4. Si el token es válido, la petición continúa; si no, se rechaza con 401

### Middleware de Protección

El middleware `verifyToken` en `src/middlewares/auth.middleware.js`:
- Extrae el token de las cookies
- Verifica la firma del token con la clave secreta
- Añade la información del usuario a `req.user`
- Permite que la petición continúe o la rechaza

## 🗄️ Estructura de Datos en Firestore

### Colección: `users`
```javascript
{
	email: "juan@example.com",
	name: "Juan Pérez",
	password: "$2b$10$...",  // Solo para usuarios email/password
	googleUid: "google123",  // Solo para usuarios de Google
	createdAt: "2024-01-01T00:00:00.000Z"
}
```

### Colección: `tasks`
```javascript
{
	userId: "user123",
	title: "Completar proyecto",
	completed: false
}
```

## 🧪 Probar la API

Puedes probar la API usando herramientas como:

- **Postman** - [Descargar](https://www.postman.com/downloads/)
- **Insomnia** - [Descargar](https://insomnia.rest/download)
- **Thunder Client** - Extensión de VS Code

### Ejemplo con cURL

**Registro:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@test.com","password":"password123","confirmPassword":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"juan@test.com","password":"password123"}'
```

**Crear tarea (requiere estar autenticado):**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Mi primera tarea","completed":false}'
```

## 📖 Conceptos Clave para Estudiantes

### Arquitectura en Capas

El proyecto sigue una arquitectura en capas que separa responsabilidades:

1. **Rutas (Routes):** Define los endpoints y los asocia con controladores
2. **Controladores (Controllers):** Maneja las peticiones HTTP y las respuestas
3. **Servicios (Services):** Contiene la lógica de negocio y acceso a datos
4. **Middlewares:** Funciones que procesan las peticiones antes de llegar a los controladores
5. **Schemas:** Validación de datos con Zod

### Validación de Datos

Usamos **Zod** para validar los datos de entrada antes de procesarlos. Esto asegura que:
- Los datos tengan el formato correcto
- Se prevengan errores en tiempo de ejecución
- Se proporcionen mensajes de error claros al cliente

### Seguridad

- **Contraseñas hasheadas:** Nunca se almacenan contraseñas en texto plano
- **JWT con HTTP-only cookies:** Previene ataques XSS
- **Validación de tokens:** Todas las rutas protegidas verifican el JWT
- **Variables de entorno:** Información sensible no está en el código

## 🚨 Consideraciones de Seguridad

> **Importante para producción:**
> 
> - Cambia `JWT_SECRET` por una clave aleatoria y segura
> - No subas `firebase-key.json` a GitHub (ya está en `.gitignore`)
> - No subas el archivo `.env` a GitHub
> - Configura CORS adecuadamente para tu dominio
> - Usa HTTPS en producción
> - Configura `sameSite: 'strict'` y `secure: true` en cookies para producción

## 📖 Versión

**v2.0.0** - Versión con autenticación completa (email/password y Google)

## 🤝 Contribuir

Este es un proyecto educativo. Si encuentras errores o tienes sugerencias:

1. Abre un Issue
2. Propón cambios mediante Pull Requests
3. Mejora la documentación

## 📝 Licencia

Este proyecto fur creado por Ing. Giancarlo Aguilar y es de código abierto. Está disponible para fines educativos.

---

*Desarrollado como parte del curso de Desarrollo y Soporte de Aplicaciones Multiplataforma en Certus*