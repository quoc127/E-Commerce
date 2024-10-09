import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Fragment, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useNavigate } from "react-router-dom";

export const AdminSideBar = () => {
  const [selectedTooltip, setselectedTooltip] = useState(null);
  const navigate = useNavigate();

  const handleSelectedTooltip = (name) => {
    setselectedTooltip(selectedTooltip === name ? null : name);
    navigate(`/admin/${name}`)
  };

  return (
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => handleSelectedTooltip("dashboard")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer ${
                    selectedTooltip === "dashboard"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => handleSelectedTooltip("orders")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer ${
                    selectedTooltip === "orders"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div  onClick={() => handleSelectedTooltip("products")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer ${
                    selectedTooltip === "products" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`}>
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
  );
};

export default AdminSideBar;
