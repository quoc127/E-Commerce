import { getToken } from "@/helper/get-token";
import axios from "axios";


const token = getToken();

export const getAllImage = () => {
  return axios.get("http://localhost:5000/api/slide/all-image", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postImage = ({ image, name, description }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);

  if (image) {
    formData.append("image", image);
  }

  return axios.post("http://localhost:5000/api/slide/add-image", formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteImage = (id) => {
  return axios.delete(`http://localhost:5000/api/slide/delete-image/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editImage = (id, { image, name, description }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);

  if (image) {
    formData.append("image", image);
  }
  return axios.patch(
    `http://localhost:5000/api/slide/edit-image/${id}`,
    formData,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
