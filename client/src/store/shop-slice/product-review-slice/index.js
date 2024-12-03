import {
  addProductReview,
  getProductReview,
} from "@/services/shop-api/product-reivew";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const postShopProductReview = createAsyncThunk(
  "/shop/post-product-review",
  async (formData) => {
    const response = await addProductReview(formData);
    return response.data;
  }
);

export const getShopProductReview = createAsyncThunk(
  "/shop/get-product-review",
  async (productId) => {
    const response = await getProductReview(productId);
    return response.data;
  }
);

const productReviewSlice = createSlice({
  name: "productReviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShopProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getShopProductReview.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default productReviewSlice.reducer;
