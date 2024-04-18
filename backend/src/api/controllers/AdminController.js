// controllers/adminController.js
import adminService from '../services/AdminService.js';

const register = async (req, res) => {
    try {
        const user = await adminService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const user = await adminService.authenticateUser(user_email, user_password);
        if (user) {
            res.status(200).json({ message: "Inicio de sesión exitoso", user });
        } else {
            res.status(401).json({ message: "Credenciales inválidas"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    register,
    login
};
