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
import { SearchInput } from "./shopping-header/search-input";

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
      <div className="px-4 flex flex-col lg:flex-col xl:flex-row items-center justify-between gap-4">
        {/* Hàng đầu tiên */}
        <div className="flex items-center justify-between lg:justify-end w-full">
          <Link to="/shop/home" className="flex items-center gap-2">
            <img
              src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/logo-regular.png"
              alt="Logo"
            />
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
          <div className="hidden lg:block mx-auto">
            <MenuItems />
          </div>
          <div className="hidden lg:block xl:hidden">
            <HeaderRightContent />
          </div>
        </div>

        {/* Hàng thứ hai */}
        <div className="flex items-center justify-between w-full xl:max-w-[400px] mb-2 xl:my-0 gap-4">
          <div className="w-full lg:max-w-[400px]">
            <SearchInput
              keyword={keyword}
              setKeyword={setKeyword}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              completeSearch={completeSearch}
              setCompleteSearch={setCompleteSearch}
              handleInput={handleInput}
            />
          </div>
          <div className="hidden xl:block">
            <HeaderRightContent />
          </div>
        </div>
      </div>
    </header>
  );
};
