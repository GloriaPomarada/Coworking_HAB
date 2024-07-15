import bcrypt from 'bcrypt';
import * as NewPassModel from '../../models/users/index.js';

const updatePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const user = await NewPassModel.getUser(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Old password is incorrect.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await NewPassModel.updatePassword(userId, hashedPassword);

        res.status(200).json({ message: '¡Contraseña cambiada con éxito!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

export default updatePassword;
