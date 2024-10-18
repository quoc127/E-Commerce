import axios from "axios";

export const getAllProducts = () => {
  return axios.get("http://localhost:5000/api/product/all-product", {
    withCredentials: true,
  });
};

export const getProductsPaginate = (page, limit) => {
  return axios.get(
    `http://localhost:5000/api/product/pagination?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

export const postAddNewProduct = ({
  productName,
  price,
  description,
  productImage,
  totalProducts,
  brandName,
  categoryName,
}) => {
  const formData = new FormData();
  formData.append("name", productName);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("total", totalProducts);
  formData.append("brandId", brandName);
  formData.append("categoryId", categoryName);

  if (productImage) {
    formData.append("image", productImage);
  }

  return axios.post("http://localhost:5000/api/product/add-product", formData, {
    withCredentials: true,
  });
};

export const deleteProduct = (id) => {
  return axios.delete(`http://localhost:5000/api/product/delete/${id}`, {
    withCredentials: true,
  });
};

export const editProduct = (
  id,
  {
    productName,
    price,
    description,
    productImage,
    totalProducts,
    brandName,
    categoryName,
  }
) => {
  const formData = new FormData();
  formData.append("name", productName);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("total", totalProducts);
  formData.append("brandId", brandName);
  formData.append("categoryId", categoryName);

  if (productImage) {
    formData.append("image", productImage);
  }
  return axios.patch(
    `http://localhost:5000/api/product/edit/${id}`,
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
