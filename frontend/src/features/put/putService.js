import axios from "axios";

const API_URL = "http://localhost:5000/api/product/";

// Update product
const update = async (listData, id) => {
  const formData = new FormData();

  const options = {
    url: `${API_URL}${id}`,
    method: "PUT",
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

const putService = {
  update,
};

export default putService;
