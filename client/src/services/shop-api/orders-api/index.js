import axios from "axios";

export const postCreateOrder = (orderData) => {
  return axios.post("http://localhost:5000/api/shop/order/create", orderData, {
    withCredentials: true,
  });
};

export const postCaptureOrder = (orderId, paymentId, payerId) => {
  return axios.post(
    "http://localhost:5000/api/shop/order/capture",
    {
      orderId: orderId,
      paymentId: paymentId,
      payerId: payerId,
    },
    {
      withCredentials: true,
    }
  );
};

export const getAllOrderByUser = (userId) => {
  return axios.get(`http://localhost:5000/api/shop/order/list/${userId}`, {
    withCredentials: true,
  });
};

export const getDetailOrderByUser = (orderId) => {
  return axios.get(`http://localhost:5000/api/shop/order/detail/${orderId}`, {
    withCredentials: true,
  });
};