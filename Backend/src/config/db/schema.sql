DROP DATABASE IF EXISTS coworking_db;
CREATE DATABASE coworking_db;
USE coworking_db;

--? Usuarios:
CREATE TABLE usuarios (
    id CHAR(36) PRIMARY KEY NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100),
    active BOOLEAN DEFAULT false,
    role ENUM('admin', 'cliente') DEFAULT 'cliente',
    registrationCode CHAR(30),
    recoverPassCode CHAR(10),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
    modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--? Admins:
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id CHAR(36) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

--? Categorías de Espacios:
CREATE TABLE categorias_espacios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

--? Categorías Incidencias:
CREATE TABLE categorias_incidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

--? Espacios:
CREATE TABLE espacios (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  categoria_id INT,
  capacidad INT,
  precio_por_persona DECIMAL(10, 2),
  precio_espacio_completo DECIMAL(10, 2),
  direccion VARCHAR(100),
  estado ENUM('libre', 'reservado') DEFAULT 'libre',
  incidencias TEXT,
  imagen LONGBLOB,
  FOREIGN KEY (categoria_id) REFERENCES categorias_espacios(id)
);

--? Incidencias. Relaciona incidencias con espacio y categorías especificas:
CREATE TABLE incidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    espacio_id INT NOT NULL,
    categoria_incidencia_id INT NOT NULL,
    descripcion TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (espacio_id) REFERENCES espacios(id),
    FOREIGN KEY (categoria_incidencia_id) REFERENCES categorias_incidencias(id)
);

--? Fotos de los Espacios:
CREATE TABLE espacios_fotos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    espacio_id INT NOT NULL,
    FOREIGN KEY (espacio_id) REFERENCES espacios(id),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

--? Votos de cada espacio:
CREATE TABLE espacios_votos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    value TINYINT UNSIGNED NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    espacio_id INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (espacio_id) REFERENCES espacios(id),
    INDEX (usuario_id),
    INDEX (espacio_id)
);

--? Equipamientos:
CREATE TABLE equipamientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias_espacios(id)
);

--? Tabla intermedia para relacionar espacios y equipamientos:
CREATE TABLE espacios_equipamientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  espacio_id INT NOT NULL,
  equipamiento_id INT NOT NULL,
  FOREIGN KEY (espacio_id) REFERENCES espacios(id),
  FOREIGN KEY (equipamiento_id) REFERENCES equipamientos(id)
);

--? Reservas:
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  usuario_id CHAR(36) NOT NULL,
  espacio_id INT NOT NULL,
  tipo ENUM('por_persona', 'espacio_completo'),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  estado ENUM('pendiente', 'reservado', 'cancelada') NOT NULL DEFAULT 'pendiente',
  observaciones TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (espacio_id) REFERENCES espacios(id)
);


--? Pagos:
CREATE TABLE pagos (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  reserva_id INT NOT NULL,
  a_pagar DECIMAL(10, 2) NOT NULL,
  fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
  observaciones TEXT,
  FOREIGN KEY (reserva_id) REFERENCES reservas(id)
);