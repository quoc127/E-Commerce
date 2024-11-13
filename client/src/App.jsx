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
import { useEffect } from "react";
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
import { ProductDetail } from "./components/shopping-view/product-detail";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

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
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="/shop/home" />}></Route>
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route path="products-list" element={<ProductsList />}></Route>
          <Route path="product-detail/:productId" element={<ProductDetail />}></Route>
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
