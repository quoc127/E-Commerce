import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getAllBrands = () => {
  return axios.get(`${serverUrl}/brand/all-brand`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBrandsPaginate = (page, limit) => {
  return axios.get(
    `${serverUrl}/brand/pagination?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const postAddNewBrands = (name, description) => {
  return axios.post(
    `${serverUrl}/brand/add-brand`,
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

export const deleteAdminBrand = (id) => {
  return axios.delete(`${serverUrl}/brand/delete/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editAdminBrand = (id, { name, description }) => {
  return axios.patch(
    `${serverUrl}/brand/edit/${id}`,
    {
      name: name,
      description: description,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
