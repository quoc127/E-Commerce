import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();

export const postAddress = (formData) => {
  return axios.post("http://localhost:5000/api/shop/address/add", formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAddress = (userId) => {
  return axios.get(`http://localhost:5000/api/shop/address/get/${userId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchAddress = (userId, addressId, formData) => {
  return axios.patch(
    `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
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
    `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
