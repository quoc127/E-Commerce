import { Outlet } from "react-router-dom";
import {AdminSideBar} from "./side-bard";
import { AdminHeader } from "./header";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div>
        <AdminSideBar />
      </div>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
