import { Route, Routes } from "react-router-dom";
import { AuthLogin } from "./pages/auth/login";
import { AuthRegister } from "./pages/auth/register";
import { AuthLayout } from "./components/auth/layout";
import { ShoppingLayout } from "./components/shopping-view/layout";
import { ShoppingHome } from "./pages/shopping-view/home";
import { AdminLayout } from "./components/admin-view/layout";
import { AdminDashboard } from "./pages/admin-view/dashboard";
import { CheckAuth } from "./components/common/check-auth";

function App() {

  const isAuthenticated = true
  const user = "user"
  

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
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
        </Route>
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
