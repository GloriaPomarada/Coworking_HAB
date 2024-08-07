# Gestión de espacios de Coworking

Este proyecto consiste en el desarrollo de una web de gestión de espacios de coworking. La plataforma permite crear y administrar espacios, crear usuarios, reservar y valorar espacios.

El frontend ha sido desarrollado empleando React y Vite y el backend Node y MySql.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Arrancar la Aplicación](#arrancar-la-aplicación)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Rutas del Frontend](#rutas-del-frontend)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Desarrolladores](#desarrolladores)

## Requisitos

- Node.js
- MySQL
- Git

## Instalación

1. Clona este repositorio:

   git clone git@github.com:GloriaPomarada/Coworking_HAB.git

2. Instala las dependencias para el frontend y el backend:

   # Navega al directorio del frontend

   cd frontend
   npm install

   # Navega al directorio del backend

   cd backend
   npm install

## Configuración

1. Configura las variables de entorno para el backend:

   - Crea un archivo `.env` en el directorio `backend` y agrega la configuración (también puedes copiar el archivo .env.example y renombrarlo a .env):

   PORT=
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   SMTP_HOST=s
   SMTP_PORT=
   SMTP_USER=
   SMTP_APIKEY=
   JWT_EXP=
   UPLOADS_DIR=
   CLIENT_URL=

2. Configura las variables de entorno para el frontend:

   - Crea un archivo `.env` en el directorio `frontend` y agrega la configuración (también puedes copiar el archivo .env.local y renombrarlo a .env):

   VITE_API_URL=

## Arrancar la Aplicación

### Backend

1. Navega al directorio del backend:

   cd backend

2. Arranca el servidor:

   npm run dev

3. Crea la base de datos:

   npm run initDB

4. Puedes poblar las tablas con los datos de prueba del archivo seeds.sql, que se encuentra dentro de backend>src>config>db>seeds.sql

### Frontend

1. Navega al directorio del frontend:

   cd frontend

2. Arranca el servidor:

   npm run dev

3. Abre tu navegador y ve a `http://localhost:3000` (o el puerto que estés utilizando) para ver la aplicación en funcionamiento.

## Rutas del Frontend

A continuación se detalla el listado de las rutas disponibles en el frontend:

- `/`: Página de inicio.
- `/auth/login`: Página de inicio de sesión.
- `/auth/register`: Página de registro de nuevos usuarios.
- `/user/profile`: Panel de control del usuario o administrador. Permite cambiar el avatar y redirecciona a cambio de contraseña y reservas del usuario.
- `/auth/updatePass`: Página para actualizar la contraseña del usuario.
- `/user/my-bookings`: Listado de reservas del usuario.
- `/user/new-booking/:id` : Crear una nueva reserva de un espacio de coworking.
- `user/adminBookings`: Reservas pendientes de aprobación.
- `/user/incident-list`: Listado de incidencias del usuario.
- `/booking/create/:id`: Crear una nueva reserva de un espacio de coworking.
- `/space/spaces`: Listado de espacios de coworking.
- `/space/filter-spaces`: Filtrado de los espacios de coworking.
- `/space/get-space/:id`: Detalle de un espacio de coworking específico. Redirecciona a la página de crear reservas de ese espacio.
- `/space/create-space`: Crear un nuevo espacio de coworking.
- `/space/update-space/:id`: Modificar un espacio de coworking existente.
- `/space/new-incident`: Crear una nueva incidencia en un espacio de coworking.

## Tecnologías Utilizadas

- **Frontend**: React, Vite y TailwindCSS
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL

## Contribuir

Este es un proyecto de código abierto y las contribuciones son bienvenidas.

## Licencia

Este proyecto cuenta con licencia conforme a los términos de la licencia MIT.

## Desarrolladores

- Abel Coria
- Antonio Gómez
- Roberto Medrano
- Gloria Pomarada
