const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async ({ limit = 10, skip = 0 } = {}) => {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
  const data = await response.json();
  return data;
};

export const fetchProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  return response.json();
};
