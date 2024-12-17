import { getToken } from "@/helper/get-token";
import axios from "axios";
const token = getToken();
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const postCreateOrder = (orderData) => {
  return axios.post(`${serverUrl}/shop/order/create`, orderData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postCaptureOrder = (orderId, paymentId, payerId) => {
  return axios.post(
    `${serverUrl}/shop/order/capture`,
    {
      orderId: orderId,
      paymentId: paymentId,
      payerId: payerId,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllOrderByUser = (userId) => {
  return axios.get(`${serverUrl}/shop/order/list/${userId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailOrderByUser = (orderId) => {
  return axios.get(`${serverUrl}/shop/order/detail/${orderId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
