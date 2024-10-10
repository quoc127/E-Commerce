import axios from "axios";

export const getAllBrands = () => {
  return axios.get("http://localhost:5000/api/brand/all-brand", {
    withCredentials: true,
  });
};

export const postAddNewBrands = (name, description) => {
  return axios
    .post(
      "http://localhost:5000/api/brand/add-brand",
      {
        name: name,
        description: description,
      },
      {
        withCredentials: true,
      }
    );
};
