import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('token'); 

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url)); 
  }

  try {

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


    const { role } = decodedToken;
    req.role = role;

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url)); 
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'], 
};