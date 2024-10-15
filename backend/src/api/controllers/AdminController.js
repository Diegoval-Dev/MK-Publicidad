import adminService from '../services/AdminService.js';
import jwt from 'jsonwebtoken';

/**
 * @openapi
 * /api/admin/register:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Registers a new user
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
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
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
 *     summary: Log in
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
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Server error
 */
const login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const authResult = await adminService.authenticateUser(user_email, user_password);
        if (authResult) {
            const token = jwt.sign(
                { userId: authResult.user.id, role: authResult.user.user_role }, // Add role to the payload
                process.env.JWT_SECRET,
                { expiresIn: '1h' }  // Token expiration
            );
            res.status(200).json({ message: "Login successful", token }); // Send token in the response
        } else {
            res.status(401).json({ message: "Invalid credentials" });
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
 *     summary: Updates an existing user
 *     parameters:
 *       - in: path
 *         name: user_email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to update
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
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
const updateUser = async (req, res) => {
    try {
        const { user_email } = req.params;
        const updatedUser = await adminService.updateUser(user_email, req.body);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
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
 *     summary: Deletes an existing user
 *     parameters:
 *       - in: path
 *         name: user_email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to delete
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully deleted
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 */
const deleteUser = async (req, res) => {
    try {
        const { user_email } = req.params;
        const deletedUser = await adminService.deleteUser(user_email);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    register,
    login,
    updateUser,
    deleteUser  // Method to delete users
};
