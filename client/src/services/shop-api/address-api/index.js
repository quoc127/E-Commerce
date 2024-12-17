import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const postAddress = (formData) => {
  return axios.post(`${serverUrl}/shop/address/add`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAddress = (userId) => {
  return axios.get(`${serverUrl}/shop/address/get/${userId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchAddress = (userId, addressId, formData) => {
  return axios.patch(
    `${serverUrl}/shop/address/update/${userId}/${addressId}`,
    formData,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteAddress = (userId, addressId) => {
  return axios.delete(
    `${serverUrl}/shop/address/delete/${userId}/${addressId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
