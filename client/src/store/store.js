import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import slideReducer from "./admin-slice/slide-slice";
import brandReducer from "./admin-slice/brands-slice";
import categoryReducer from "./admin-slice/category-slice"
import productReducer from "./admin-slice/products-slice"
import shopProductReducer from "./shop-slice/products-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminSlide: slideReducer,
    adminBrands: brandReducer,
    adminCategories: categoryReducer,
    adminProducts: productReducer,
    shopProducts: shopProductReducer,
  },
});

export default store;
