import {
  deleteCartItem,
  getCartItem,
  patchCartItem,
  postCartItem,
} from "@/services/shop-api/carts-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cartItemList: [],
};

export const postShopCartItem = createAsyncThunk(
  "shop/add-cart-item",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await postCartItem(userId, productId, quantity);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const getShopCartItem = createAsyncThunk(
  "shop/get-cart-item",
  async ({ userId }, { rejectWithValue }) => {
    const response = await getCartItem(userId);
    return response.data;
  }
);

export const patchShopCartItem = createAsyncThunk(
  "shop/patch-cart-item",
  async ({ userId, productId, quantity }) => {
    const response = await patchCartItem(userId, productId, quantity);
    return response.data;
  }
);

export const deleteShopCartItem = createAsyncThunk(
  "shop/delete-cart-item",
  async ({ userId, productId }) => {
    const response = await deleteCartItem(userId, productId);
    return response.data;
  }
);

const cartsSlice = createSlice({
  name: "shopCart",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postShopCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postShopCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItemList = action.payload.data;
      })
      .addCase(postShopCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItemList = [];
      })
      .addCase(getShopCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItemList = action.payload.data;
      })
      .addCase(getShopCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItemList = [];
      })
      .addCase(patchShopCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(patchShopCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItemList = action.payload.data;
      })
      .addCase(patchShopCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItemList = [];
      })
      .addCase(deleteShopCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShopCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItemList = action.payload.data;
      })
      .addCase(deleteShopCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItemList = [];
      });
  },
});

export default cartsSlice.reducer;
