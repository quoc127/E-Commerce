import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopCartItem,
  postShopCartItem,
} from "@/store/shop-slice/carts-slice";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const ShoppingProductTile = ({ productItem }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToCart = (productId) => {
    dispatch(
      postShopCartItem({ userId: user.id, productId: productId, quantity: 1 })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(getShopCartItem({ userId: user.id }));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  };


  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 border">
      <div>
        <div
          onClick={() => navigate(`/shop/product-detail/${productItem._id}`)}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
        >
          <img
            alt={productItem.name}
            src={productItem.image}
            className="w-full h-48 object-cover mb-4 rounded-md cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow text-center">
          <h3 className="mt-4 text-sm text-gray-700">{productItem.name}</h3>
          <div className="mt-4 flex justify-between">
            <p className="mt-1 text-lg font-medium text-gray-900">
              {productItem.price}$
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {productItem.total}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <Button onClick={() => handleAddToCart(productItem._id)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};
