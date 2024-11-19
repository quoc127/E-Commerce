import { Search, LogOut, Menu, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { getShopAllProductsSearch } from "@/store/shop-slice/products-slice";

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { Category: [getCurrentMenuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("products-list") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?Category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center lg:flex-row gap-6 ">
      {shoppingViewHeaderMenuItems.map((menuItem, index) => {
        return (
          <Label
            key={index}
            className="text-sm font-medium cursor-pointer"
            onClick={() => handleNavigate(menuItem)}
          >
            {menuItem.label}
          </Label>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-5 cursor-pointer">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate(`/shop/user-detail/${user?._id}`)}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ShoppingHeader = ({
  keyword,
  setKeyword,
  searchResults,
  setSearchResults,
  completeSearch,
  setCompleteSearch,
  handleInput,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex px-4 items-center justify-between h-16">
        <Link to="/shop/home" className="flex items-center gap-2">
          <img src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/logo-regular.png"></img>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="relative flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={keyword}
            onKeyDown={(event) => {
              if (event.key === "Enter" && keyword && searchResults) {
                navigate("/shop/products-list");
                setCompleteSearch(true);
              }
            }}
            onChange={(event) => {
              handleInput(event);
              setCompleteSearch(false);
            }}
            type="search"
            placeholder="Search..."
            className="w-full pl-8 md:w-[200px] lg:w-[336px]"
          />
          {keyword && searchResults.length > 0 && (
            <div
              className={`${
                completeSearch ? "hidden" : "block"
              } absolute z-10 mt-2 w-full max-h-[300px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg`}
            >
              {searchResults.map((item, index) => (
                <div key={index} className="flex flex-row m-2 pb-2 border-b-2">
                  <img src={item.image} width="50px" className="object-cover" />
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm w-full"
                    onClick={() => {
                      navigate(`/shop/product-detail/${item._id}`);
                      setKeyword("");
                      setSearchResults([]);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};
