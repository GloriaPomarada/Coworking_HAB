import pool from '../../config/connection.js';

const selectCategoriesModel = async () => {
    const [categories] = await pool.query('SELECT * FROM categorias_espacios');
    return categories;
};

export default selectCategoriesModel;