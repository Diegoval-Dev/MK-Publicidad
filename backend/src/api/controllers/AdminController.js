// controllers/adminController.js
import adminService from '../services/AdminService.js';

/**
 * @openapi
 * /api/admin/register:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 example: user@example.com
 *               user_password:
 *                 type: string
 *                 example: Password123!
 *               user_role:
 *                 type: string
 *                 example: admin
 *               user_name:
 *                 type: string
 *                 example: John Doe
 *               position:
 *                 type: string
 *                 example: Manager
 *               user_phone:
 *                 type: string
 *                 example: '1234567890'
 *               user_officePhone:
 *                 type: string
 *                 example: '0987654321'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error en el servidor
 */
const register = async (req, res) => {
    try {
        const user = await adminService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/admin/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Inicia sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 example: user@example.com
 *               user_password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error en el servidor
 */
const login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const authResult = await adminService.authenticateUser(user_email, user_password);
        if (authResult) {
            res.status(200).json({ message: "Inicio de sesión exitoso", ...authResult });
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    register,
    login
};
