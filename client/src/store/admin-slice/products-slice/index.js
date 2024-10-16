import { deleteProduct, editProduct, getAllProducts, getProductsPaginate, postAddNewProduct } from "@/services/admin-api/products-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productsList: [],
  totalPages: 0,
  totalItems: 0,
};

export const getAdminAllProducts = createAsyncThunk("/admin/get-all-products", async () => {
  const response = await getAllProducts();
  return response.data;
});

export const getAdminProductsPagination = createAsyncThunk(
  "/admin/get-products-pagination",
  async ({ page, limit }) => {
    const response = await getProductsPaginate(page, limit);
    return response.data;
  }
);

export const postAdminNewProduct = createAsyncThunk(
  "/admin/add-product",
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const response = await postAddNewProduct(name, description);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const deleteAdminProduct = createAsyncThunk(
  "/admin/detele-product",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteProduct(id);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const editAdminProduct = createAsyncThunk(
  "/admin/edit-product",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await editProduct(id, formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const productsSlice = createSlice({
  name: "adminBrands",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAdminAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(getAdminAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productsList = [];
      })
      .addCase(getAdminProductsPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminProductsPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getAdminProductsPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.productsList = [];
      })
      .addCase(postAdminNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postAdminNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(postAdminNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
