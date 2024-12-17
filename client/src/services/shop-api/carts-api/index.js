import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const postCartItem = (userId, productId, quantity) => {
  return axios.post(
    `${serverUrl}/shop/cart/add`,
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
  return axios.get(`${serverUrl}/shop/cart/get/${userId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchCartItem = (userId, productId, quantity) => {
  return axios.patch(
    `${serverUrl}/shop/cart/update`,
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
    `${serverUrl}/shop/cart/delete/${userId}/${productId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
