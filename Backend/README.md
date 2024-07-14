# Coworking API

Esta es la API de la aplicación para gestionar espacios de coworking. Mediante su uso es posible:
-Crear espacios: los administradores pueden crear y gestionar los espacios disponibles.
-Realizar reservas y gestión de espacios: Los usuarios pueden reservar espacios y los administradores pueden gestionar estas reservas.
-Consulta de información: Los usuarios pueden acceder a la información detallada de cada espacio.

## Tecnologías empleadas

    -Base de datos relacional, empleando MySQL
    -API RESTful
    -Node.js y Express.js

## Cómo arrancar el backend

1. Instalamos las dependencias de desarrollo ejecutando en la línea de comandos:
   npm i
2. Creamos un fichero .env y copiamos en él las variables de entorno de .env.example, que completaremos con nuestros datos.
3. Iniciamos la conexión y la creación de la base de datos ejecutando en la línea de comandos:
   npm run initDB
4. Iniciamos el servidor ejecutando en la línea de comandos:
   npm run dev

## Endpoints

### Usuarios

**Rutas públicas**

1. **POST /api/users/register** Registra un nuevo usuario
2. **PUT /api/users/activate** Activa un usuario mediante el código de registro
3. **POST /api/users/login** - Login de usuario
4. **POST /api/users/password/recover** Recuperación de contraseña
5. **PUT /users/password/reset** Cambio de contraseña

**Rutas privadas**

1. **GET /api/users** Devuelve el listado de los perfiles de usuarios
2. **GET /api/users/profile** Devuelve el perfil de un usuario

### Espacios

1.  **POST /api/spaces** - Crea un nuevo espacio
2.  **GET /api/spaces** Devuelve el listado de espacios con descripción
3.  **PUT /api/spaces** Modifica un espacio
4.  **GET /api/spaces/search?key=value** Filtrado de espacios
5.  **GET /api/categories** Devuelve las categorías de espacios

### Equipamiento

1.  **GET /api/equipment** Devuelve listado de equipamiento

### Categorías

1.  **GET /api/categories** Devuelve listado de categorias de espacio existentes

### Reservas

1. **POST /api/bookings/create** Crea la reserva de un espacio
2. **PUT /api/bookings/:bookingsId** Cancela la reserva de un espacio
3. **GET /api/bookings?key=value** Devuelve las reservas filtradas
4. **POST /api/bookings/reservation/:espacioID/status** Aceptar reserva
5. **GET /api/bookings/details/:reservaID** Devuelve detalles y mensajes de la reserva

### Incidencias

1.  **GET /api/incidents** Devuelve el listado de incidencias
2.  **GET /api/incidentsCategories** Devuelve las categorías de incidencias
3.  **POST /api/incidents/create** Crea una nueva incidencia
4.  **POST /api/incidents/postmessage** Crea un mensaje de incidencia

### Votar espacios

1. **POST /api/ratings/create** Crea el voto de espacios
