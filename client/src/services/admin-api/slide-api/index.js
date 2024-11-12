import axios from "axios";

export const getAllImage = () => {
  return axios.get("http://localhost:5000/api/slide/all-image", {
    withCredentials: true,
  });
};

export const postImage = ({
  image,
  name,
  description,
}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);

  if (image) {
    formData.append("image", image);
  }

  return axios.post("http://localhost:5000/api/slide/add-image", formData, {
    withCredentials: true,
  });
};