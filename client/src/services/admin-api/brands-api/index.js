import axios from "axios";

export const getAllBrands = () => {
  // const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
  return axios.get("http://localhost:5000/api/brand/all-brand", {
    withCredentials: true,
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export const getBrandsPaginate = (page, limit) => {
  return axios.get(`http://localhost:5000/api/brand/pagination?page=${page}&limit=${limit}`, {
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
      withCredentials: true,
    },
    {
      name: name,
      description: description,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
