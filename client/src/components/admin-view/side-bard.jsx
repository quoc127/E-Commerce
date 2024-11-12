import {
  ChartBarStacked,
  Home,
  Image,
  Package,
  Package2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: "slides",
    label: "Image Slides",
    path: "/admin/slides",
    icon: <Image className="h-5 w-5" />,
  },
  // {
  //   id: "orders",
  //   label: "Orders",
  //   path: "/admin/orders",
  //   icon: <ShoppingCart className="h-5 w-5" />,
  // },
  {
    id: "brands",
    label: "Brands",
    path: "/admin/brands",
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "category",
    label: "Categories",
    path: "/admin/category",
    icon: <ChartBarStacked className="h-5 w-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Package className="h-5 w-5" />,
  },
];

const MenuItems = () => {
  const navigate = useNavigate();
  const [selectedTooltip, setselectedTooltip] = useState(null);
  const handleSelectedTooltip = (name) => {
    setselectedTooltip(selectedTooltip === name ? null : name);
    navigate(`/admin/${name}`);
  };
  return (
    <nav className="flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => handleSelectedTooltip(menuItem.id)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer ${
                  selectedTooltip === menuItem.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {menuItem.icon}
                <span className="sr-only">{menuItem.label}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{menuItem.label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  );
};

export const AdminSideBar = () => {
  return (
    <>
     
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          </div>
          <MenuItems />
        </nav>
      </aside>
    </>
  );
};