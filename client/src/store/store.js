import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import slideCommonReducer from "./common-slice/slide-slice";
import brandReducer from "./admin-slice/brands-slice";
import categoryReducer from "./admin-slice/category-slice"
import productReducer from "./admin-slice/products-slice"
import shopProductReducer from "./shop-slice/products-slice"
import shopCartItemReducer from "./shop-slice/carts-slice"
import shopAddressReducer from "./shop-slice/address-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    commonSlide: slideCommonReducer,
    adminBrands: brandReducer,
    adminCategories: categoryReducer,
    adminProducts: productReducer,
    shopProducts: shopProductReducer,
    shopCartItem: shopCartItemReducer,
    shopAddress: shopAddressReducer,
  },
});

export default store;
