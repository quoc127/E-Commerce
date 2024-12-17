import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const addProductReview = (formData) => {
  return axios.post(
    `${serverUrl}/shop/product-review/add`,
    formData,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getProductReview = (productId) => {
  return axios.get(
    `${serverUrl}/shop/product-review/get/${productId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
