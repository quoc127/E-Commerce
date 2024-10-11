import axios from "axios";

export const getAllCategories = () => {
  return axios.get("http://localhost:5000/api/category/all-category");
};

export const postAddNewCategory = ({ name, description }) => {
  return axios.post("http://localhost:5000/api/category/add-category", {
    name: name,
    description: description,
  });
};

export const deleteAdminCategory = (id) => {
  return axios.delete(`http://localhost:5000/api/category/delete/${id}`);
};

export const editAdminCategory = (id, { name, description }) => {
  return axios.patch(
    `http://localhost:5000/api/category/edit/${id}`,
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
