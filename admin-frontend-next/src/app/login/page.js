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
        user_password: password,
      });

      localStorage.setItem('token', data.token);
      document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=Lax`;

      console.log('Redirigiendo al dashboard...');
      router.push('/dashboard');
    } catch (error) {
      setError('Error en la autenticación. Verifica tus credenciales.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#3D6720' }}>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/image.png" alt="MK Logo" className="h-16" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300 font-bold text-lg"
            style={{ backgroundColor: '#65A30D', hover: { backgroundColor: '#4B8510' } }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
