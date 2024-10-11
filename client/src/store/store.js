import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import brandReducer from "./admin-slice/brands-slice";
import categoryReducer from "./admin-slice/category-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminBrands: brandReducer,
    adminCategories: categoryReducer,
  },
});

export default store;
