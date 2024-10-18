import { useEffect, useState } from "react";
import { InputField } from "./input-filed";
import { SelectField } from "./select-field";
import { TextAreaField } from "./text-area-field";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProductsPagination } from "@/store/admin-slice/products-slice";
import { getBrands } from "@/store/admin-slice/brands-slice";
import { getCategories } from "@/store/admin-slice/category-slice";

export const AdminFormProduct = ({
  onSubmit,
  formData,
  setFormData,
  setIsOpenSheet,
  currentEditedId,
  currentPage,
  itemsPerPage,
}) => {
  const { brandList } = useSelector((state) => state.adminBrands);
  const { categoryList } = useSelector((state) => state.adminCategories);

  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    setFormData((prevValues) => ({
      ...prevValues,
      productImage: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setFormData((prevValues) => ({
      ...prevValues,
      productImage: null,
    }));
    setPreviewImage(null);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAdminProductsPagination({ page: currentPage, limit: itemsPerPage })
    );
  }, [dispatch, currentPage, itemsPerPage]);

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-row-12">
            <InputField
              label="Product Name"
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChangeValue}
            />
            <InputField
              label="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChangeValue}
              min={0}
            />
            <InputField
              label="Total Product"
              type="number"
              name="totalProducts"
              value={formData.totalProducts}
              onChange={handleChangeValue}
              min={1}
            />
            <SelectField
              text="brand"
              label="Brand Name"
              name="brandName"
              value={formData.brandName}
              onChange={handleChangeValue}
              options={brandList.map((brand) => brand.name)}
            />
            <SelectField
              text="categpry"
              label="Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChangeValue}
              options={categoryList.map((category) => category.name)}
            />
            <TextAreaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChangeValue}
            />
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {previewImage || currentEditedId ? (
                    <div className="relative">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer"
                      >
                        <img
                          src={
                            typeof formData.productImage === "string"
                              ? formData.productImage
                              : previewImage
                          }
                          alt="Preview"
                          className="mx-auto h-48 w-48 object-cover"
                        />
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleChangeFile}
                          className="sr-only"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-[-30px] right-[-50px] bg-gray-500 text-white rounded-full p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleChangeFile}
                        className="sr-only"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
        onClick={() => setIsOpenSheet(false)}
          type="button"
          className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
