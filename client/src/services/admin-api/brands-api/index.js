import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();

export const getAllBrands = () => {
  return axios.get("http://localhost:5000/api/brand/all-brand", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBrandsPaginate = (page, limit) => {
  return axios.get(
    `http://localhost:5000/api/brand/pagination?page=${page}&limit=${limit}`,
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
    "http://localhost:5000/api/brand/add-brand",
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
  return axios.delete(`http://localhost:5000/api/brand/delete/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editAdminBrand = (id, { name, description }) => {
  return axios.patch(
    `http://localhost:5000/api/brand/edit/${id}`,
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
