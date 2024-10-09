import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBrands } from "@/services/admin-api/brands-api";

const initialState = {
  isLoading: false,
  brandList: [],
};

export const getBrands = createAsyncThunk("/admin/get-all-brans", async () => {
  const response = await getAllBrands();
  return response.data;
});

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
      });
  },
});

export default brandsSlice.reducer;
