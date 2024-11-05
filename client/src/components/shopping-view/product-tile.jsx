import { Button } from "../ui/button";

export const ShoppingProductTile = ({ productItem }) => {
  return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 border">
        <div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <img
              alt={productItem.name}
              src={productItem.image}
              className="w-full h-48 object-cover mb-4 rounded-md"
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
          <Button>Add to cart</Button>
        </div>
      </div>
  );
};
