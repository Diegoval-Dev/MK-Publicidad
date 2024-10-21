export async function login(user_email, user_password) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${baseURL}admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_email, user_password }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la autenticación');
  }

  return await response.json();
}

export async function register(userData) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${baseURL}/admin/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error en el registro');
  }

  return await response.json();
}