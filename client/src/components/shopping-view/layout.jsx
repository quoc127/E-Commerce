import { Outlet } from "react-router-dom";
import { ShoppingHeader } from "./shopping-header";

export const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white">
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};
