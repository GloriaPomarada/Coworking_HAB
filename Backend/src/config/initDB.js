import getPool from './getPool.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query('SET FOREIGN_KEY_CHECKS = 0');
        await pool.query(
            'DROP TABLE IF EXISTS mensajes_incidencias, pagos, reservas, espacios_equipamientos, equipamientos, espacios_votos, espacios_fotos, incidencias, espacios, categorias_incidencias, categorias_espacios, usuarios'
        );
        await pool.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Creando tablas...');

        // Primero las tablas sin dependencias de claves externas
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

        await pool.query(`
            CREATE TABLE IF NOT EXISTS categorias_espacios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS categorias_incidencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT
            )
        `);

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
                valoracion_media DECIMAL(3, 2) DEFAULT 0.0,
                FOREIGN KEY (categoria_id) REFERENCES categorias_espacios(id)
            )
        `);

        // Luego las tablas con dependencias de claves externas
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

        await pool.query(`
            CREATE TABLE IF NOT EXISTS incidencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                espacio_id INT NOT NULL,
                reserva_id INT NOT NULL,
                usuario_id CHAR(36) NOT NULL,
                categoria_incidencia_id INT NOT NULL,
                titulo TEXT,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (espacio_id) REFERENCES espacios(id),
                FOREIGN KEY (reserva_id) REFERENCES reservas(id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (categoria_incidencia_id) REFERENCES categorias_incidencias(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS mensajes_incidencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                incidencia_id INT NOT NULL,
                mensaje TEXT,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                espacio_id INT NOT NULL,
                reserva_id INT NOT NULL,
                usuario_id CHAR(36) NOT NULL,
                FOREIGN KEY (espacio_id) REFERENCES espacios(id),
                FOREIGN KEY (reserva_id) REFERENCES reservas(id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (incidencia_id) REFERENCES incidencias(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS espacios_fotos (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                name VARCHAR(100) NOT NULL,
                espacio_id INT NOT NULL,
                FOREIGN KEY (espacio_id) REFERENCES espacios(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS espacios_votos (
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
    INDEX (espacio_id),
    INDEX (reserva_id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS equipamientos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS espacios_equipamientos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                espacio_id INT NOT NULL,
                equipamiento_id INT NOT NULL,
                FOREIGN KEY (espacio_id) REFERENCES espacios(id),
                FOREIGN KEY (equipamiento_id) REFERENCES equipamientos(id)
            )
        `);

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

// Creación de procedimientos almacenados y disparadores
        console.log('Creando procedimientos almacenados y disparadores...');

        await pool.query(`
            CREATE PROCEDURE actualizarMediaValoracionesEspacio(IN p_espacio_id INT)
            BEGIN
                DECLARE media DECIMAL(3, 2);

                SELECT AVG(value) INTO media
                FROM espacios_votos
                WHERE espacio_id = p_espacio_id;

            UPDATE espacios
            SET valoracion_media = media
            WHERE id = p_espacio_id;
        END
        `);

        await pool.query(`
            CREATE TRIGGER after_insert_valoracion
            AFTER INSERT ON espacios_votos
            FOR EACH ROW
            BEGIN
                CALL actualizarMediaValoracionesEspacio(NEW.espacio_id);
            END
        `);

        await pool.query(`
            CREATE TRIGGER after_update_valoracion
            AFTER UPDATE ON espacios_votos
            FOR EACH ROW
            BEGIN
                CALL actualizarMediaValoracionesEspacio(NEW.espacio_id);
            END
        `);

        await pool.query(`
            CREATE TRIGGER after_delete_valoracion
            AFTER DELETE ON espacios_votos
            FOR EACH ROW
            BEGIN
                CALL actualizarMediaValoracionesEspacio(OLD.espacio_id);
            END
        `);

        console.log('Procedimientos almacenados y disparadores creados correctamente');

        // Insertamos datos en la tabla de usuarios con contraseñas encriptadas.
        console.log('Insertando datos iniciales en la tabla de usuarios...');

        const users = [
            {
                 email: 'admin@example.com',
                username: 'admin',
                password: 'Admin123!',
                role: 'admin',
            },
             {
                email: 'usuario1@example.com',
                username: 'usuario1',
                password: 'Password123!',
                role: 'cliente',
            },
            {
                email: 'usuario2@example.com',
                username: 'usuario2',
                password: 'Password456!',
                role: 'cliente',
            },
            {
                email: 'usuario3@example.com',
                username: 'usuario3',
                password: 'Password789!',
                role: 'cliente',
            },
        ];

        for (const user of users) {
            user.id = uuidv4(); // Generamos un UUID para cada usuario.
            user.password = await hashPassword(user.password); // Encriptamos la contraseña del usuario.
            user.active = true;
            user.registrationCode =
                'regCode' + Math.floor(Math.random() * 1000); // Generamos un código de registro aleatorio.
            user.recoverPassCode = 'recov' + Math.floor(Math.random() * 1000); // Generamos un código de recuperación aleatorio.
        }

        const userInsertPromises = users.map((user) =>
            pool.query(
                `INSERT INTO usuarios (id, email, username, password, role, active, registrationCode, recoverPassCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    user.id,
                    user.email,
                    user.username,
                    user.password,
                    user.role,
                    user.active,
                    user.registrationCode,
                    user.recoverPassCode,
                ]
            )
        );

        await Promise.all(userInsertPromises);

        console.log('Usuarios insertados correctamente');
    } catch (err) {
        console.error('Error al inicializar la base de datos:', err);

    } finally {
        pool.end(); // Cerrar la conexión al finalizar la inicialización
        process.exit();
    }
    };

main();