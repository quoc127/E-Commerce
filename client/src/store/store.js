import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import brandReducer from "./admin-slice/brands-slice";
import categoryReducer from "./admin-slice/category-slice"
import productReducer from "./admin-slice/products-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminBrands: brandReducer,
    adminCategories: categoryReducer,
    adminProducts: productReducer,
  },
});

export default store;
