'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const data = await login({
        user_email: email,
        user_password: password
      });

      localStorage.setItem('token', data.token);
      document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=Lax`;

      console.log("Redirigiendo al dashboard..."); 
      router.push('/dashboard');
    } catch (error) {
      setError('Error en la autenticación. Verifica tus credenciales.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ligth-green">
      <div className="w-full max-w-md bg-calendar-selectday p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center color-text mb-6">MK Publicidad - Iniciar Sesión</h1>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-color-text mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-color-contorno rounded-lg focus:outline-none focus:ring-2 focus:ring-color-symbols"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-color-text mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-color-contorno rounded-lg focus:outline-none focus:ring-2 focus:ring-color-symbols"
              required
            />
          </div>

          {/* Mostrar error */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-color-button text-white font-bold py-2 px-4 rounded-lg hover:bg-color-symbols"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
