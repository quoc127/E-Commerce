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


export const deleteImage = (id) => {
  return axios.delete(`http://localhost:5000/api/slide/delete-image/${id}`, {
    withCredentials: true,
  });
};

export const editImage = (
  id,
  {
    image,
    name,
    description,
  }
) => {
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
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};