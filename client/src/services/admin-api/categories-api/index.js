import axios from "axios";

export const getAllCategories = () => {
  return axios.get("http://localhost:5000/api/category/all-category", {
    withCredentials: true,
  });
};

export const postAddNewCategory = ({ name, description }) => {
  return axios.post(
    "http://localhost:5000/api/category/add-category",
    {
      name: name,
      description: description,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteAdminCategory = (id) => {
  return axios.delete(`http://localhost:5000/api/category/delete/${id}`, {
    withCredentials: true,
  });
};

export const editAdminCategory = (id, { name, description }) => {
  return axios.patch(
    `http://localhost:5000/api/category/edit/${id}`,
    {
      name: name,
      description: description,
    },
    {
      withCredentials: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
