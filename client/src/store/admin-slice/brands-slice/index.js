import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteAdminBrand,
  editAdminBrand,
  getAllBrands,
  postAddNewBrands,
} from "@/services/admin-api/brands-api";

const initialState = {
  isLoading: false,
  brandList: [],
};

export const getBrands = createAsyncThunk("/admin/get-all-brans", async () => {
  const response = await getAllBrands();
  return response.data;
});

export const postNewBrand = createAsyncThunk(
  "/admin/add-brand",
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const response = await postAddNewBrands(name, description);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "/admin/detele-brand",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteAdminBrand(id);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const editBrand = createAsyncThunk(
  "/admin/edit-brand",
  async ({ id, formData }, { rejectWithValue }) => {
    
    try {
      const response = await editAdminBrand(id, formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const brandsSlice = createSlice({
  name: "adminBrands",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brandList = action.payload.data;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.brandList = [];
      })
      .addCase(postNewBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postNewBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brandList = action.payload.data;
      })
      .addCase(postNewBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default brandsSlice.reducer;
