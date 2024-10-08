import adminService from '../services/AdminService.js';
import jwt from 'jsonwebtoken';

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
    console.log(req.body);
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
 */
const login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const authResult = await adminService.authenticateUser(user_email, user_password);
        if (authResult) {
            const token = jwt.sign(
                { userId: authResult.user.id, role: authResult.user.user_role }, // Agregar rol al payload
                process.env.JWT_SECRET,
                { expiresIn: '1h' }  // Duración del token
            );
            res.status(200).json({ message: "Inicio de sesión exitoso", token }); // Enviar token en la respuesta
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * @openapi
 * /api/admin/update/{user_email}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Actualiza un usuario existente
 *     parameters:
 *       - in: path
 *         name: user_email
 *         schema:
 *           type: string
 *         required: true
 *         description: El correo electrónico del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_password:
 *                 type: string
 *                 example: NewPassword123!
 *               user_role:
 *                 type: string
 *                 example: admin
 *               user_name:
 *                 type: string
 *                 example: John Updated
 *               position:
 *                 type: string
 *                 example: Updated Manager
 *               user_phone:
 *                 type: string
 *                 example: '0987654321'
 *               user_officePhone:
 *                 type: string
 *                 example: '1234567890'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
const updateUser = async (req, res) => {
    try {
        const { user_email } = req.params;
        const updatedUser = await adminService.updateUser(user_email, req.body);

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/admin/delete/{user_email}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Elimina un usuario existente
 *     parameters:
 *       - in: path
 *         name: user_email
 *         schema:
 *           type: string
 *         required: true
 *         description: El correo electrónico del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
const deleteUser = async (req, res) => {
    try {
        const { user_email } = req.params;
        const deletedUser = await adminService.deleteUser(user_email);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    register,
    login,
    updateUser,
    deleteUser  // método para eliminar usuarios
};
