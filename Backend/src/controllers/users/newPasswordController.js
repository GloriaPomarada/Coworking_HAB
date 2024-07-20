import bcrypt from 'bcrypt';
import validateSchema from '../../utils/validateSchema.js';
import newPassSchema from '../../schema/user/newPassSchema.js';
import * as NewPassModel from '../../models/users/index.js';

const updatePassword = async (req, res, next) => {
    const { userId, oldPassword, newPassword } = req.body;

    
    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Debes completar todos los campos!.' });
    }

    try {
        const user = await NewPassModel.getUser(userId);

        //Validamos el body con Joi.
        await validateSchema(newPassSchema, req.body);


        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña Incorrecta.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await NewPassModel.updatePassword(userId, hashedPassword);

        res.send({
            status: 'ok',
            message: 'Has cambiado tu contraseña.',
        });
    } catch (err) {
        next(err);
    }
};

export default updatePassword;
