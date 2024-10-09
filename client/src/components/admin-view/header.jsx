import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

export const AdminHeader = () => {
  const dispatch =  useDispatch()

  const handleLogout = (event) => { 
    event.preventDefault();
    dispatch(logoutUser())
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};