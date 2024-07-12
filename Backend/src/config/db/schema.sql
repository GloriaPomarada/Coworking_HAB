DROP DATABASE IF EXISTS coworking_db;
CREATE DATABASE coworking_db;
USE coworking_db;

-- Usuarios:
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

-- Admins:
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id CHAR(36) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Categorías de Espacios:
CREATE TABLE categorias_espacios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Categorías Incidencias:
CREATE TABLE categorias_incidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Espacios:
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

-- Incidencias. Relaciona incidencias con espacio, categorías y usuarios específicos:
CREATE TABLE incidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    espacio_id INT NOT NULL,
    categoria_incidencia_id INT NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    mensaje TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (espacio_id) REFERENCES espacios(id),
    FOREIGN KEY (categoria_incidencia_id) REFERENCES categorias_incidencias(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Fotos de los Espacios:
CREATE TABLE espacios_fotos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    espacio_id INT NOT NULL,
    FOREIGN KEY (espacio_id) REFERENCES espacios(id),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Reservas:
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

-- Tabla espacios_votos 
CREATE TABLE espacios_votos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    value TINYINT UNSIGNED NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    espacio_id INT NOT NULL,
    reserva_id INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (espacio_id) REFERENCES espacios(id),
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    INDEX (usuario_id),
    INDEX (espacio_id)
);

-- Equipamientos:
CREATE TABLE equipamientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias_espacios(id)
);

-- Tabla intermedia para relacionar espacios y equipamientos:
CREATE TABLE espacios_equipamientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  espacio_id INT NOT NULL,
  equipamiento_id INT NOT NULL,
  FOREIGN KEY (espacio_id) REFERENCES espacios(id),
  FOREIGN KEY (equipamiento_id) REFERENCES equipamientos(id)
);

-- Pagos:
CREATE TABLE pagos (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  reserva_id INT NOT NULL,
  a_pagar DECIMAL(10, 2) NOT NULL,
  fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
  observaciones TEXT,
  FOREIGN KEY (reserva_id) REFERENCES reservas(id)
);


-- PARA QUE APAREZCAN Y SE ACTUALICEN LAS VALORACIONES DE LOS ESPACIOS:
-- 1: Añadimos columna de Valoraciones en espacios.
ALTER TABLE espacios
ADD COLUMN valoracion_media DECIMAL(3, 2) DEFAULT 0.0;

-- 2: Lógica para calcular la media.
DELIMITER //
CREATE PROCEDURE actualizarMediaValoracionesEspacio(IN p_espacio_id INT)
BEGIN
    DECLARE media DECIMAL(3, 2);

    SELECT AVG(value) INTO media
    FROM espacios_votos
    WHERE espacio_id = p_espacio_id;

    UPDATE espacios
    SET valoracion_media = media
    WHERE id = p_espacio_id;
END //
DELIMITER ;

-- 3: Disparador para nuevas valoraciones.
DELIMITER //
CREATE TRIGGER after_insert_valoracion
AFTER INSERT ON espacios_votos
FOR EACH ROW
BEGIN
    CALL actualizarMediaValoracionesEspacio(NEW.espacio_id);
END //
DELIMITER ;

-- 4: Disparador para valoración existente.
DELIMITER //
CREATE TRIGGER after_update_valoracion
AFTER UPDATE ON espacios_votos
FOR EACH ROW
BEGIN
    CALL actualizarMediaValoracionesEspacio(NEW.espacio_id);
END //
DELIMITER ;

-- 5: Disparador para borrar una valoracion.
DELIMITER //
CREATE TRIGGER after_delete_valoracion
AFTER DELETE ON espacios_votos
FOR EACH ROW
BEGIN
    CALL actualizarMediaValoracionesEspacio(OLD.espacio_id);
END //
DELIMITER ;