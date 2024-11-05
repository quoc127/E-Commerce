import { Button } from "../ui/button";

export const ShoppingProductTile = ({ productItem }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 border">
        <h2 className="sr-only">Products</h2>
        <div>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              alt={productItem.name}
              src={productItem.image}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{productItem.name}</h3>
          <div className="mt-4 flex justify-between">
            <p className="mt-1 text-lg font-medium text-gray-900">
              {productItem.price}$
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {productItem.total}
            </p>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {productItem.brandName}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {productItem.categoryName}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};
