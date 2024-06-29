import mysql from mysql

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión a MySQL establecida.');
});

// Middleware para manejar datos JSON
app.use(express.json());

// Ruta para la búsqueda con múltiples filtros
app.get('/api/espacios', (req, res) => {
    const { nombre, capacidad, direccion, equipamiento, precio_espacio_completo } = req.query;

    // Construye la consulta SQL dinámicamente según los filtros proporcionados
    let query = 'SELECT * FROM espacios WHERE 1=1'; // 1=1 para evitar problemas con AND

    if (nombre) {
        query += ` AND nombre LIKE '%${nombre}%'`;
    }
    if (capacidad) {
        query += ` AND capacidad = '${capacidad}'`;
    }
    if (direccion) {
        query += ` AND direccion = '${direccion}'`;
    }
    if (equipamiento){
        query += `AND equipamiento = '${equipamiento}`
    }
    if(precio_espacio_completo){
        query += `AND precio_espacio_completo=${precio_espacio_completo}`
    }


    // Ejecuta la consulta
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los resultados:', error);
            res.status(500).json({ message: 'Error al obtener los resultados' });
        } else {
            res.status(200).json(results);
        }
    });
});

