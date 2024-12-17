import { getToken } from "@/helper/get-token";
import axios from "axios";


const token = getToken();

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getAllImage = () => {
  return axios.get(`${serverUrl}/slide/all-image`, {
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

  return axios.post(`${serverUrl}/slide/add-image`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteImage = (id) => {
  return axios.delete(`${serverUrl}/slide/delete-image/${id}`, {
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
    `${serverUrl}/slide/edit-image/${id}`,
    formData,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
