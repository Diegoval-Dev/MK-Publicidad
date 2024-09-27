import userModel from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

// Autenticar usuario (login)
const authenticateUser = async (email, password) => {
    const user = await userModel.findOne({ where: { user_email: email } });
    if (user && await bcrypt.compare(password, user.user_password)) {
        const token = jwt.sign(
            { email: user.user_email, role: user.user_role },
            SECRET_KEY,
            { expiresIn: '1h' }  // El token expira en 1 hora
        );
        return { user, token };
    }
    return null;
};

// Registrar un nuevo usuario
const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.user_password, 10);
    const newUser = {
        ...userData,
        user_password: hashedPassword
    };
    return await userModel.create(newUser);
};

// Actualizar usuario
const updateUser = async (email, userData) => {
    const user = await userModel.findOne({ where: { user_email: email } });
    
    if (!user) {
        return null;  // Usuario no encontrado
    }

    // Si la contraseña es proporcionada, la encriptamos
    if (userData.user_password) {
        userData.user_password = await bcrypt.hash(userData.user_password, 10);
    }

    // Actualizamos el usuario
    await user.update(userData);
    return user;
};

// Eliminar usuario
const deleteUser = async (email) => {
    const user = await userModel.findOne({ where: { user_email: email } });
    
    if (!user) {
        return null;  // Usuario no encontrado
    }

    await user.destroy();  // Eliminar el usuario
    return user;
};

export default {
    registerUser,
    authenticateUser,
    updateUser,
    deleteUser  //  método de eliminación de usuarios
};
