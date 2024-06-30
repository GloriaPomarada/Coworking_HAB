import mysql from 'mysql2/promise';
import { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } from '../../env.js';

// pool almacena un array de conexiones.
let pool;

// getPool retorna un pool de conexiones con la base de datos.
const getPool = async () => {
    try {
        // Si "pool" es undefined =>
        if (!pool) {
            // Creamos una pool temporal.
            const poolTemp = mysql.createPool({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
            });

            // Con el pool temporal creamos la base de datos si no existe.
            await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

            // Creamos un grupo de conexiones.
            pool = mysql.createPool({
                connectionLimit: 10,
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
            });
        }

        // Retornamos un pool.
        return pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
