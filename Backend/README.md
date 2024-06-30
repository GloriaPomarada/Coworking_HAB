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
3. Iniciamos el servidor ejecutando en la línea de comandos:
   npm run dev
4. Iniciamos la conexión y la creación de la base de datos ejecutando en la línea de comandos:
   initDB.js

## Endpoints

### Users

1. **POST /users** Registra un nuevo usuario
2. **POST /users/login** - Login de usuario
3. **POST /auth/recuperacion-password** Recuperación de contraseña
4. **POST /auth/cambio-password** Cambio de contraseña

### Spaces

1.  **POST /spaces** - Crea un nuevo espacio
2.  **GET /spaces** Devuelve el listado de espacios con filtrado
3.  **GET /spaces/descripcion** Devuelve el listado de espacios con descripción
4.  **GET /spaces/equipamiento** Devuelve información del equipamiento
5.  **GET /spaces/tipo** Devuelve información sobre el tipo de espacio

### Reservas

1. **POST /reserva** Crea la reserva de un espacio
2. **DELETE /reserva/1** Cancela la reserva de un espacio
3. **GET reserva/1** Devuelve la confirmación o el rechazo de la reserva al mail

### Incidencias

1.  **GET /incidencias** Devuelve las categorías de incidencias
