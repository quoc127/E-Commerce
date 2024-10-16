import axios from "axios";

export const getAllProducts = () => {
  return axios.get("http://localhost:5000/api/product/all-product", {
    withCredentials: true,
  });
};

export const getProductsPaginate = (page, limit) => {
  return axios.get(`http://localhost:5000/api/product/pagination?page=${page}&limit=${limit}`, {
    withCredentials: true,
  });
};

export const postAddNewProduct = (name, description) => {
  return axios.post(
    "http://localhost:5000/api/product/add-product",
    {
      name: name,
      description: description,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteProduct = (id) => {
  return axios.delete(`http://localhost:5000/api/product/delete/${id}`, {
    withCredentials: true,
  });
};

export const editProduct = (id, { name, description }) => {
  return axios.patch(
    `http://localhost:5000/api/product/edit/${id}`,
    {
      name: name,
      description: description,
    },
     {
      withCredentials: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
