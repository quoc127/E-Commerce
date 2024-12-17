import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken(); 
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getAllCategories = () => {
  return axios.get(`${serverUrl}/category/all-category`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategoriesPaginate = (page, limit) => {
  return axios.get(
    `${serverUrl}/category/pagination?page=${page}&limit=${limit}`,
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
    `${serverUrl}/category/add-category`,
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
  return axios.delete(`${serverUrl}/category/delete/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editAdminCategory = (id, { name, description }) => {
  return axios.patch(
    `${serverUrl}/category/edit/${id}`,
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
