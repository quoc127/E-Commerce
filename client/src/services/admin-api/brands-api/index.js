import axios from "axios";

export const getAllBrands = () => {
  return axios.get("http://localhost:5000/api/brand/all-brand", {
    withCredentials: true,
  });
};

export const postAddNewBrands = (name, description) => {
  return axios.post(
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

export const deleteAdminBrand = (id) => {
  return axios.delete(`http://localhost:5000/api/brand/delete/${id}`, {
    withCredentials: true,
  });
};

export const editAdminBrand = (id, { name, description }) => {
  
  return axios.patch(
    `http://localhost:5000/api/brand/edit/${id}`,
    {
      name: name,
      description: description,
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
};
