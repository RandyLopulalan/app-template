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

// Update product
const updateProduct = async (dataProduct) => {
  const {_id} = dataProduct
  const {name, price, stock, status, image} = dataProduct
  const options = {
    url: API_URL + _id,
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {name, price, stock, status, image}
  };
  const response = await axios(options)

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
  updateProduct,
  deleteProduct,
};

export default productService;
