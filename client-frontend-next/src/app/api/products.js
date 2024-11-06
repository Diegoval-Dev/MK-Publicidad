
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProductsByCategory(categoryId) {
  try {
    const response = await fetch(
      `${API_URL}/products/category/${encodeURIComponent(categoryId)}`
    );
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en fetchProductsByCategory:', error);
    throw error;
  }
}


export async function fetchProductById(productId) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error('No fue posible obtener el producto.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetchProductById:', error);
    throw error;
  }
}