const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.role; // El rol ya debería estar en req.role desde authMiddleware
        
        // Verificar si el rol del usuario está en la lista de roles permitidos
        if (allowedRoles.includes(userRole)) {
            next(); // Si el rol está permitido, pasa a la siguiente función
        } else {
            return res.status(403).json({ message: 'Acceso denegado: rol no autorizado.' });
        }
    };
};

export default verifyRoles;
