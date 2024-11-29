import { useDispatch, useSelector } from "react-redux";
import { UserCartItemsContent } from "../../components/shopping-view/shopping-cart/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Address from "@/components/shopping-view/shopping-address/address";
import { toast } from "@/hooks/use-toast";
import { createShopOrder } from "@/store/shop-slice/order-slice";

export const ShoppingCheckout = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItemList } = useSelector((state) => state.shopCartItem);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();

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

  const handleInitiatePaypalPayment = () => {
    if (cartItemList.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user.id,
      cartId: cartItemList._id,
      cartItems: cartItemList.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        country: currentSelectedAddress.country,
        city: currentSelectedAddress.city,
        address: currentSelectedAddress.address,
        phoneNumber: currentSelectedAddress.phoneNumber,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createShopOrder(orderData)).then((data) => {
      if (data.payload.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  

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
