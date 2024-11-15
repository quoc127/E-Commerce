import axios from "axios";

export const getAllProducts = () => {
  return axios.get("http://localhost:5000/api/shop/product/all-products", {
    withCredentials: true,
  });
};

export const getAllNewProducts = () => {
  return axios.get("http://localhost:5000/api/shop/product/new-products", {
    withCredentials: true,
  });
};

export const getProductById = (id) => {
  return axios.get(`http://localhost:5000/api/shop/product/product-detail/${id}`, {
    withCredentials: true,
  });
};

export const getFilterProducts = (filterParams, sortParams) => {
  const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
  return axios.get(`http://localhost:5000/api/shop/product/filter?${query}`, {
    withCredentials: true,
  });
};

export const getUser= () => {
  return axios.get("http://localhost:5000/api/shop/user-detail", {
    withCredentials: true,
  });
};
