import axios from "axios";

export const postAddress = (formData) => {
  console.log("formData", formData);
  
  return axios.post(
    "http://localhost:5000/api/shop/address/add",
    formData,
    {
      withCredentials: true,
    }
  );
};

export const getAddress = (userId) => {
  return axios.get(`http://localhost:5000/api/shop/address/get/${userId}`, {
    withCredentials: true,
  });
};

export const patchAddress = (userId, addressId, formData) => {
  return axios.patch(
    `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
    formData,
    {
      withCredentials: true,
    }
  );
};

export const deleteAddress  = (userId, addressId) => {
  return axios.delete(
    `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`,
    {
      withCredentials: true,
    }
  );
};
