import { Route, Routes } from "react-router-dom";
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
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[800] bg-black h-[600px]" />;
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
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
        </Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={useDispatch}>
              <AuthLayout />
            </CheckAuth>
          }
        >
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
          <Route path="dashboard" element={<AdminDashboard />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />}></Route>
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
