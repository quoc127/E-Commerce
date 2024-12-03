import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();

export const addProductReview = (formData) => {
  return axios.post(
    "http://localhost:5000/api/shop/product-review/add",
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
    `http://localhost:5000/api/shop/product-review/get/${productId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
