import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Formato esperado "Bearer [TOKEN]"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido o expirado.' });
        }

        req.user = user; // Adjuntar información del usuario al objeto de solicitud
        next(); // Pasar control a la siguiente middleware/ruta
    });
};

export default authMiddleware;
