import * as userModel from '../../models/users/index.js';


const getUsersController = async (req, res) => {
    const filters = req.query;

    try {
        const findUsers = await userModel.getAllUsers(filters);
        res.json(findUsers);
        
    } catch (error) {
        console.error('Error al filtrar usuarios:', error);
        res.status(500).json({ mensaje: 'Hubo un error al filtrar los usuarios' });
    }
};


export default getUsersController;