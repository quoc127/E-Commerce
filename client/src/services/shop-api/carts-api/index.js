import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();

export const postCartItem = (userId, productId, quantity) => {
  return axios.post(
    "http://localhost:5000/api/shop/cart/add",
    {
      userId: userId,
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getCartItem = (userId) => {
  return axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchCartItem = (userId, productId, quantity) => {
  return axios.patch(
    "http://localhost:5000/api/shop/cart/update",
    {
      userId: userId,
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteCartItem = (userId, productId) => {
  return axios.delete(
    `http://localhost:5000/api/shop/cart/delete/${userId}/${productId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
