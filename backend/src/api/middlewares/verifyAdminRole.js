const verifyAdminRole = (req, res, next) => {
    const role = req.role; // El rol ya debería estar en req.role desde la validación del token JWT en authMiddleware

    if (role === 'admin') {
        next(); // Si el rol es admin, pasa a la siguiente función
    } else {
        return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador.' });
    }
};

export default verifyAdminRole;
