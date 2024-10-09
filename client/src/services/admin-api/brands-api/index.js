import axios from "axios";

export const getAllBrands = () => {
  return axios.get("http://localhost:5000/api/brand/all-brand", {
    withCredentials: true,
  });
};
