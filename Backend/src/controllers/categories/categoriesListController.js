import * as categoriesModel from '../../models/categories/index.js';

const getCategoriesController = async (req, res) => {
    try {
        const categories = await categoriesModel.getCategories();
        res.json(categories);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

export default getCategoriesController;