import getPool from './getPool.js';

const main = async () => {
    // Variable que almacenará una conexión con la base de datos.
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS pagos, reservas, espacios_equipamientos, equipamientos, espacios_votos, espacios_fotos, incidencias, espacios, categorias_incidencias, categorias_espacios, admins, usuarios'
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
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
            )	
        `);

        // Creamos la tabla admins.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS admins(
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id CHAR(36) NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
            )
        `)

        // Creamos la tabla Categorías de Espacios.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS categorias_espacios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT
            )
        `)

        // Creamos la tabla Categorías de Incidencias.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS categorias_incidencias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT
            )
        `)


        // Creamos la tabla de espacios.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS espacios (
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
            )
        `);

        // Creamos la tabla de Incidencias.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS incidencias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            espacio_id INT NOT NULL,
            categoria_incidencia_id INT NOT NULL,
            descripcion TEXT,
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (espacio_id) REFERENCES espacios(id),
            FOREIGN KEY (categoria_incidencia_id) REFERENCES categorias_incidencias(id)
            )
        `);


        // Creamos la tabla espacios_fotos.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS espacios_fotos (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            espacio_id INT NOT NULL,
            FOREIGN KEY (espacio_id) REFERENCES espacios(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Creamos la tabla de espacios_votos.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS espacios_votos (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            value TINYINT UNSIGNED NOT NULL,
            usuario_id CHAR(36) NOT NULL,
            espacio_id INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
            FOREIGN KEY (espacio_id) REFERENCES espacios(id),
            INDEX (usuario_id),
            INDEX (espacio_id)
            )
        `);

        // Creamos la tabla de equipamientos.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS equipamientos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT,
            categoria_id INT,
            FOREIGN KEY (categoria_id) REFERENCES categorias_espacios(id)
            )
        `);

        // Creamos la tabla de espacios_equipamientos.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS espacios_equipamientos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            espacio_id INT NOT NULL,
            equipamiento_id INT NOT NULL,
            FOREIGN KEY (espacio_id) REFERENCES espacios(id),
            FOREIGN KEY (equipamiento_id) REFERENCES equipamientos(id)
            )
        `);

        // Creamos la tabla de reservas.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS reservas (
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
            )
        `);

        // Creamos la tabla de pagos.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS pagos (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            reserva_id INT NOT NULL,
            a_pagar DECIMAL(10, 2) NOT NULL,
            fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
            observaciones TEXT,
            FOREIGN KEY (reserva_id) REFERENCES reservas(id)
            )
        `);

        
        console.log('¡Tablas creadas!');

    } catch (err) {
        console.error(err);
        
    } finally {

        // Cerramos el proceso.
        process.exit();
    }
};

// Ejecutamos main.
main();
