import axios from 'axios';

const baseURL = 'http://localhost:3001'; // In a real case, this would be an environment variable

const getProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/products`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};

export default getProducts;
