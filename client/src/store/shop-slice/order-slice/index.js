import {
  getAllOrderByUser,
  getDetailOrderByUser,
  postCaptureOrder,
  postCreateOrder,
} from "@/services/shop-api/orders-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetail: null,
};

export const createShopOrder = createAsyncThunk(
  "order/create-new-order",
  async (orderData) => {
    const response = await postCreateOrder(orderData);
    return response.data;
  }
);

export const createShopCaptureOrder = createAsyncThunk(
  "order/create-capture-order",
  async ({ orderId, paymentId, payerId }) => {
    const response = await postCaptureOrder(orderId, paymentId, payerId);
    return response.data;
  }
);

export const getShopAllOrder = createAsyncThunk(
  "order/get-all-order",
  async ({ userId }) => {
    const response = await getAllOrderByUser(userId);
    return response.data;
  }
);

export const getShopDetailOrder = createAsyncThunk(
  "order/get-detail-order",
  async ({ orderId }) => {
    const response = await getDetailOrderByUser(orderId);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShopOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShopOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createShopOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getShopAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getShopAllOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getShopDetailOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopDetailOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetail = action.payload.data;
      })
      .addCase(getShopDetailOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderDetail = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
