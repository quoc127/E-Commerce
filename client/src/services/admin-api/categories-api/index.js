import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken(); 

export const getAllCategories = () => {
  return axios.get("http://localhost:5000/api/category/all-category", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategoriesPaginate = (page, limit) => {
  return axios.get(
    `http://localhost:5000/api/category/pagination?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const postAddNewCategory = ({ name, description }) => {
  return axios.post(
    "http://localhost:5000/api/category/add-category",
    {
      name: name,
      description: description,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteAdminCategory = (id) => {
  return axios.delete(`http://localhost:5000/api/category/delete/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editAdminCategory = (id, { name, description }) => {
  return axios.patch(
    `http://localhost:5000/api/category/edit/${id}`,
    {
      name: name,
      description: description,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
