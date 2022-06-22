import axios from "axios";

const API_URL = "http://localhost:5000/api/product/";

// Get Product
const getProduct = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Create product
const createProduct = async (dataProduct) => {
  const response = await axios.post(API_URL, dataProduct)

  return response.data
}

// Delete Product
const deleteProduct = async (productId) => {
  const response = await axios.delete(API_URL + productId)

  return response.data
}

const productService = {
  getProduct,
  createProduct,
  deleteProduct,
};

export default productService;
