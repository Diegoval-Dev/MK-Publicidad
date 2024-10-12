'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {

  return (
    <div className="flex min-h-screen items-center justify-center bg-color-backgroundText">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-color-tittlesAdmin mb-6">MK Publicidad - Iniciar Sesión</h1>

        <form>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-color-text mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              className="w-full p-2 border border-color-contorno rounded-lg focus:outline-none focus:ring-2 focus:ring-color-symbols"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-color-text mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              className="w-full p-2 border border-color-contorno rounded-lg focus:outline-none focus:ring-2 focus:ring-color-symbols"
            />
          </div>

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
