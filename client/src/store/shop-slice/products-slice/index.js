import {
  getAllNewProducts,
  getAllProducts,
  getFilterProducts,
  getProductById,
  getSearchProducts,
} from "@/services/shop-api/products-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productListSearch: [],
};

export const getShopAllProducts = createAsyncThunk(
  "/shop/get-all-products",
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

export const getShopAllProductsSearch = createAsyncThunk(
  "/shop/get-all-products-search",
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

export const getShopAllNewProducts = createAsyncThunk(
  "/shop/get-all-new-products",
  async () => {
    const response = await getAllNewProducts();
    return response.data;
  }
);

export const getShopProductById = createAsyncThunk(
  "/shop/get-product-by-id",
  async (id) => {
    const response = await getProductById(id);
    return response.data;
  }
);

export const getShopFilterProducts = createAsyncThunk(
  "/shop/get-filter-products",
  async ({ filterParams, sortParams }) => {
    const response = await getFilterProducts(filterParams, sortParams);
    return response.data;
  }
);

export const getShopSearchProducts = createAsyncThunk(
  "/shop/get-search-products",
  async (keyword) => {
    console.log("key", keyword);
    const response = await getSearchProducts(keyword);
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
      })
      .addCase(getShopAllProductsSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopAllProductsSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productListSearch = action.payload.data;
      })
      .addCase(getShopAllProductsSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.productListSearch = [];
      })
      .addCase(getShopSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productListSearch = action.payload.data;
      })
      .addCase(getShopSearchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productListSearch = [];
      })
      .addCase(getShopAllNewProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopAllNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getShopAllNewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getShopProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getShopProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getShopFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopFilterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getShopFilterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productsSlice.reducer;
