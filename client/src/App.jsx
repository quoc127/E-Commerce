import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthLogin } from "./pages/auth/login";
import { AuthRegister } from "./pages/auth/register";
import { AuthLayout } from "./components/auth/layout";
import { ShoppingLayout } from "./components/shopping-view/layout";
import { ShoppingHome } from "./pages/shopping-view/home";
import { AdminLayout } from "./components/admin-view/layout";
import { AdminDashboard } from "./pages/admin-view/dashboard";
import { CheckAuth } from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import { UnauthPage } from "./pages/unauth-page";
import { NotFound } from "./pages/not-found";
import { AuthChangePassword } from "./pages/auth/change-password";
import { AuthForgotPassword } from "./pages/auth/forgot-password";
import { AuthResetPassword } from "./pages/auth/reset-password";
import { AdminProduct } from "./pages/admin-view/product";
import { AdminBrand } from "./pages/admin-view/brand";
import { AdminCategory } from "./pages/admin-view/category";
import { ProductsList } from "./pages/shopping-view/products-list";
import { AdminSlide } from "./pages/admin-view/slide";
import { UserDetail } from "./components/shopping-view/user-detail";
import { ProductDetail } from "./pages/shopping-view/product-detail";
import { getShopAllProductsSearch } from "./store/shop-slice/products-slice";
function App() {
  const { productListSearch } = useSelector((state) => state.shopProducts);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [completeSearch, setCompleteSearch] = useState(false);

  const handleInput = (event) => {
    const value = event.target.value.toLowerCase();
    setKeyword(value);
    const result = productListSearch.filter((item) => {
      const slug = item.slug.replaceAll("-", " ");
      const name = item.name.toLowerCase();
      return (
        slug === value ||
        slug.includes(value) ||
        name === value ||
        name.includes(value)
      );
    });
    console.log("kq", result);
    
    setSearchResults(result);
  };

  if (
    isAuthenticated &&
    (location.pathname.includes("/change-password") ||
      location.pathname.includes("/forgot-password"))
  ) {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/shop/home");
    }
  }

  useEffect(() => {
    dispatch(getShopAllProductsSearch());
  }, [dispatch, keyword]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-full bg-black h-screen" />;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        ></Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="change-password"
            element={<AuthChangePassword />}
          ></Route>
          <Route
            path="forgot-password"
            element={<AuthForgotPassword />}
          ></Route>
          <Route path="reset-password" element={<AuthResetPassword />}></Route>
        </Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="/auth/login" />}></Route>
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" />}></Route>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="slides" element={<AdminSlide />}></Route>
          <Route path="brands" element={<AdminBrand />}></Route>
          <Route path="category" element={<AdminCategory />}></Route>
          <Route path="products" element={<AdminProduct />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout
                keyword={keyword}
                setKeyword={setKeyword}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                completeSearch={completeSearch}
                setCompleteSearch={setCompleteSearch}
                handleInput={handleInput}
              />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="/shop/home" />}></Route>
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route
            path="products-list"
            element={
              <ProductsList
                searchResults={searchResults}
                completeSearch={completeSearch}
              />
            }
          ></Route>
          <Route
            path="product-detail/:productId"
            element={<ProductDetail />}
          ></Route>
          <Route path="user-detail/:userId" element={<UserDetail />}></Route>
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route
          path="*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <NotFound />
            </CheckAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
