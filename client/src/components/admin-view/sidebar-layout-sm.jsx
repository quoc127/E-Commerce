import { Home, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Package className="h-5 w-5" />,
  },
];

export const MenuItems = () => {
  const navigate = useNavigate();
  const [selectedTooltip, setselectedTooltip] = useState(null);
  const handleSelectedTooltip = (name) => {
    setselectedTooltip(selectedTooltip === name ? null : name);
    navigate(`/admin/${name}`);
  };
  return (
    <nav className="flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem, index) => (
        <div
          key={index}
          onClick={() => handleSelectedTooltip(menuItem.id)}
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          {menuItem.icon}
          {menuItem.label}
        </div>
      ))}
    </nav>
  );
};