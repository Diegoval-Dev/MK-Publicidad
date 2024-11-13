'use client';

import { createContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import jwtDecode from 'jsonwebtoken/decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Hook para obtener la ruta actual

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Rutas que no necesitan autenticación
    const publicRoutes = ['/login', '/register'];

    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);

      // Si el usuario está autenticado, redirigirlo fuera de `/login` y `/register`
      if (publicRoutes.includes(pathname)) {
        router.push('/dashboard'); // Cambia `/dashboard` por la ruta principal a donde redirigir al usuario autenticado
      }
    } else {
      // Si no hay token y está en una ruta protegida (no pública), redirigir al login
      if (!publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    }

    setLoading(false);
  }, [router, pathname]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
