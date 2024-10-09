import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import brandReducer from "./admin-slice/brands-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminBrands: brandReducer,
  },
});

export default store;
