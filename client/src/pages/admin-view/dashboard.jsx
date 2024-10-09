import { AdminHeader } from "@/components/admin-view/header";
import { MenuItems } from "@/components/admin-view/sidebar-layout-sm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShirtIcon,
  ShoppingCart,
} from "lucide-react";

export const AdminDashboard = () => {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
    </div>
  );
};
