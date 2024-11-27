import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UserCartItemsContent } from "./cart-items-content";

export const  UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <div className="mt-8 space-y-4 max-h-[450px] overflow-x-auto">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => <UserCartItemsContent key={index} cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

