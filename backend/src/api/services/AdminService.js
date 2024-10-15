import userModel from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

// Authenticate user (login)
const authenticateUser = async (email, password) => {
    const user = await userModel.findOne({ where: { user_email: email } });
    if (user && await bcrypt.compare(password, user.user_password)) {
        const token = jwt.sign(
            { email: user.user_email, role: user.user_role },
            SECRET_KEY,
            { expiresIn: '1h' }  // The token expires in 1 hour
        );
        return { user, token };
    }
    return null;
};

// Register a new user
const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.user_password, 10);
    const newUser = {
        ...userData,
        user_password: hashedPassword
    };
    return await userModel.create(newUser);
};

// Update user
const updateUser = async (email, userData) => {
    const user = await userModel.findOne({ where: { user_email: email } });
    
    if (!user) {
        return null;  // User not found
    }

    // If the password is provided, encrypt it
    if (userData.user_password) {
        userData.user_password = await bcrypt.hash(userData.user_password, 10);
    }

    // Update the user
    await user.update(userData);
    return user;
};

// Delete user
const deleteUser = async (email) => {
    const user = await userModel.findOne({ where: { user_email: email } });
    
    if (!user) {
        return null;  // User not found
    }

    await user.destroy();  // Delete the user
    return user;
};

export default {
    registerUser,
    authenticateUser,
    updateUser,
    deleteUser  // method to delete users
};
