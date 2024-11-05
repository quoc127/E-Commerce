import { getAllProducts } from "@/services/shop-api/products-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const getShopAllProducts = createAsyncThunk(
  "/shop/get-all-products",
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "shopProducts",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getShopAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getShopAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productsSlice.reducer;