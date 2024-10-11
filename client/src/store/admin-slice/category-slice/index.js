import {
  deleteAdminCategory,
  editAdminCategory,
  getAllCategories,
  postAddNewCategory,
} from "@/services/admin-api/categories-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  categoryList: [],
};

export const getCategories = createAsyncThunk(
  "/admin/all-categories",
  async () => {
    const response = await getAllCategories();
    return response.data;
  }
);

export const postNewCategory = createAsyncThunk(
  "/admin/add-category",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postAddNewCategory(formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "/admim/delete-category",
  async (id) => {
    const response = await deleteAdminCategory(id);
    return response.data;
  }
);

export const editCategory = createAsyncThunk(
  "admin/edit-category",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await editAdminCategory(id, formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const categorySlice = createSlice({
  name: "adminCategory",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categoryList = [];
      })
      .addCase(postNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(postNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
