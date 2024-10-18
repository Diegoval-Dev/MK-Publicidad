import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('token'); // Obtener el token JWT de las cookies

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirigir a /login si no hay token
  }

  try {
    // Decodificar el token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar roles o permisos si es necesario
    const { role } = decodedToken;
    req.role = role;

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirigir si el token es inválido
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'], // Protege estas rutas
};