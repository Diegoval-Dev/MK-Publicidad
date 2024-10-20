
const API_URL = 'http://localhost:3000/user'

/**
 * Obtiene todas las categorías desde el backend.
 * @returns {Promise<Array>} Lista de categorías.
 * @throws {Error} Si la solicitud falla.
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Obtiene todas las categorías desde el backend.
 * @returns {Promise<Array>} Lista de categorías.
 * @throws {Error} Si la solicitud falla.
 */
export async function searchCategories(keyword) {
  try {
    const response = await fetch(`${API_URL}/search/categories?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      throw new Error('Error al buscar categorías');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
