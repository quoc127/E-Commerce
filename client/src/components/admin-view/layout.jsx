import { Outlet } from "react-router-dom";
import AdminSideBar from "./side-bard";
import { useState } from "react";
import { AdminHeader } from "./header";

export const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <div>
        <AdminSideBar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpenSidebar={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
