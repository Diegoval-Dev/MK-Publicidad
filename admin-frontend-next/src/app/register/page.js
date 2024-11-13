"use client";

import React, { useState } from 'react';

const RegisterPage = () => {
  // Estados para cada campo del formulario
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('admin');
  const [userName, setUserName] = useState('');
  const [position, setPosition] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userOfficePhone, setUserOfficePhone] = useState('');

  // Manejar el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      user_email: userEmail,
      user_password: userPassword,
      user_role: userRole,
      user_name: userName,
      position: position,
      user_phone: userPhone,
      user_office_phone: userOfficePhone,
    };

    try {
      const response = await fetch('http://localhost:3000/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log('Usuario registrado exitosamente');
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: 'var(--color-componentes)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 className="centered-title">Registro de Usuario</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Rol de Usuario:</label>
          <input
            type="text"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Posición:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono Personal:</label>
          <input
            type="text"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono de Oficina:</label>
          <input
            type="text"
            value={userOfficePhone}
            onChange={(e) => setUserOfficePhone(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="button" style={{ width: '100%' }}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
