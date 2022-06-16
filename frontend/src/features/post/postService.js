import axios from "axios";

const API_URL = "http://localhost:5000/api/product";

// Register product
const register = async (listData) => {
  const formData = new FormData();

  const options = {
    url: API_URL,
    method: "POST",
    headers: { "content-type": "multipart/form-data" },
    body: formData,
    data: listData,
  };

  const response = await axios(options);

  if (response.data) {
    localStorage.setItem("dataProduct", JSON.stringify(response.data));
  }

  return response.data;
};

const postService = {
  register,
};

export default postService;
