import axios from "axios";

export const getAllProducts = () => {
  return axios.get("http://localhost:5000/api/shop/product/all-products", {
    withCredentials: true,
  });
};
