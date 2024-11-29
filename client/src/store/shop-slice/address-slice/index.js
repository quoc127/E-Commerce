import {
  deleteAddress,
  getAddress,
  patchAddress,
  postAddress,
} from "@/services/shop-api/address-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const postShopAddress = createAsyncThunk(
  "shop/add-address",
  async (formData, { rejectWithValue }) => {
    console.log("formdata", formData);
    
    try {
      const response = await postAddress(formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const getShopAddress = createAsyncThunk(
  "shop/get-address",
  async ({ userId }, { rejectWithValue }) => {
    const response = await getAddress(userId);
    return response.data;
  }
);

export const patchShopAddress = createAsyncThunk(
  "shop/patch-address",
  async ({ userId, addressId, ...formData }) => {
    const response = await patchAddress(userId, addressId, formData);
    return response.data;
  }
);

export const deleteShopAddress = createAsyncThunk(
  "shop/delete-address",
  async ({ userId, addressId }) => {
    const response = await deleteAddress(userId, addressId);
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "shopAddress",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postShopAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postShopAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(postShopAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(getShopAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getShopAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(patchShopAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(patchShopAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(patchShopAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(deleteShopAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShopAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteShopAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
