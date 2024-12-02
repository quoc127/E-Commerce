import { getToken } from "@/helper/get-token";
import axios from "axios";

const token = getToken();

export const getAllProducts = () => {
  return axios.get("http://localhost:5000/api/shop/product/all-products", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllNewProducts = () => {
  return axios.get("http://localhost:5000/api/shop/product/new-products", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductById = (id) => {
  return axios.get(
    `http://localhost:5000/api/shop/product/product-detail/${id}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFilterProducts = (filterParams, sortParams, page, limit) => {
  const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
  return axios.get(
    `http://localhost:5000/api/shop/product/filter?${query}&page=${page}&limit=${limit}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSearchProducts = (keyword, page, limit) => {
  return axios.get(
    `http://localhost:5000/api/shop/product/search/${keyword}?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getProductsPaginate = (page, limit) => {
  return axios.get(
    `http://localhost:5000/api/shop/product/pagination?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUser = () => {
  return axios.get("http://localhost:5000/api/shop/user-detail", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
