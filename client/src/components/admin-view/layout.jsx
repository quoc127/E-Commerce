import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div>admin sidebar</div>
      <div className="flex flex-1 flex-col">admin header</div>
      <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};
