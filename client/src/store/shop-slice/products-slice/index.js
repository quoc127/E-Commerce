import {
  getAllNewProducts,
  getAllProducts,
  getFilterProducts,
  getProductById,
  getProductsPaginate,
  getSearchProducts,
} from "@/services/shop-api/products-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  totalPages: 0,
  totalItems: 0,
  productListNew: [],
  productListById: [],
  productListFilter: [],
  totalPagesFilter: 0,
  totalItemsFilter: 0,
  productListSearch: [],
  totalPagesSearch: 0,
  totalItemsSearch: 0,
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
  async ({ filterParams, sortParams, page, limit }) => {
    const response = await getFilterProducts(filterParams, sortParams, page, limit);
    return response.data;
  }
);

export const getShopSearchProducts = createAsyncThunk(
  "/shop/get-search-products",
  async ({ keyword, page, limit }) => {
    const response = await getSearchProducts(keyword, page, limit);
    return response.data;
  }
);

export const getShopProductsPagination = createAsyncThunk(
  "/admin/get-products-pagination",
  async ({ page, limit }) => {
    const response = await getProductsPaginate(page, limit);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "shopProducts",
  reducers: {
    clearProductListFilter(state) {
      state.productListFilter = [];
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getShopAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.productList = action.payload.data;
      })
      .addCase(getShopAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        // state.productList = [];
      })
      .addCase(getShopSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productListSearch = action.payload.data;
        state.totalPagesSearch = action.payload.totalPages;
        state.totalItemsSearch = action.payload.totalItems;
      })
      .addCase(getShopSearchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productListSearch = [];
      })
      .addCase(getShopProductsPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopProductsPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getShopProductsPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getShopAllNewProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopAllNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productListNew = action.payload.data;
      })
      .addCase(getShopAllNewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productListNew = [];
      })
      .addCase(getShopProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productListById = action.payload.data;
      })
      .addCase(getShopProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.productListById = [];
      })
      .addCase(getShopFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopFilterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productListFilter = action.payload.data;
        state.totalPagesFilter = action.payload.totalPages;
        state.totalItemsFilter = action.payload.totalItems;
      })
      .addCase(getShopFilterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productListFilter = [];
      });
  },
});

export const { clearProductListFilter } = productsSlice.actions;

export default productsSlice.reducer;
