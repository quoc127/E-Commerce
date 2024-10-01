import { Outlet } from "react-router-dom";

export const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <header>this is header</header>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};
