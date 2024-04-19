// services/adminService.js
import userModel from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;


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

const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.user_password, 10);
    const newUser = {
        ...userData,
        user_password: hashedPassword
    };
    return await userModel.create(newUser);
};

export default {
    registerUser,
    authenticateUser
};
