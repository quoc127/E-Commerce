import { Route, Routes } from "react-router-dom";
import { AuthLogin } from "./pages/auth/login";
import { AuthRegister } from "./pages/auth/register";
import { AuthLayout } from "./components/auth/layout";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
