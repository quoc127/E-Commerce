import { useSelector } from "react-redux";
import { UserCartItemsContent } from "../../components/shopping-view/shopping-cart/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Address from "@/components/shopping-view/shopping-address/address";

export const ShoppingCheckout = () => {
  const { cartItemList } = useSelector((state) => state.shopCartItem);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const totalCartAmount =
    cartItemList && cartItemList.items && cartItemList.items.length > 0
      ? cartItemList.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = () => {};

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItemList && cartItemList.items && cartItemList.items.length > 0
            ? cartItemList.items.map((item, index) => (
                <UserCartItemsContent key={index} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
