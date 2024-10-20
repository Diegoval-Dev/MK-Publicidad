import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Formato esperado "Bearer [TOKEN]"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido o expirado.' });
        }


        req.userId = decoded.userId;
        req.role = decoded.role;


        next();
    });
};

export default authMiddleware;
