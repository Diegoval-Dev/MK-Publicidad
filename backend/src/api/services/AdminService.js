// services/adminService.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.user_password, 10);
    const newUser = {
        ...userData,
        user_password: hashedPassword
    };
    return await User.create(newUser);
};

const authenticateUser = async (email, password) => {
    const user = await User.findOne({ where: { user_email: email } });
    if (user && await bcrypt.compare(password, user.user_password)) {
        return user;
    }
    return null;
};

export default {
    registerUser,
    authenticateUser
};
