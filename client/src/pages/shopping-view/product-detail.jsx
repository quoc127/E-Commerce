import { OptionSelector } from "@/components/shopping-view/product-detail/product-detail-selector";
import { ShowReview } from "@/components/shopping-view/product-detail/show-review";
import { StarRating } from "@/components/shopping-view/product-detail/star-icon";
import { ChooseColor, ChooseSize } from "@/config/product-detail";
import { getShopProductReview } from "@/store/shop-slice/product-review-slice";
import { getShopProductById } from "@/store/shop-slice/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
  const { productListById } = useSelector((state) => state.shopProducts);
  const { reviews } = useSelector((state) => state.shopProductReview);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [rating, setRating] = useState(0);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  useEffect(() => {
    dispatch(getShopProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getShopProductReview(productId));
  }, [dispatch, productId]);
  
  return (
    <div>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {productListById.brandName}
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {productListById.categoryName}
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {productListById.name}
                </a>
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden max-w-screen-md max-h-96 mx-auto border items-center">
              <img
                alt={productListById.name}
                src={productListById.image}
                className=" object-cover size-full p-4"
              />
            </div>
            <div className=" max-w-2xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-96 lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8">
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {productListById.price}$
                </p>

                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div>
                    <StarRating
                      rating={productListById.averageReview}
                      handleRatingChange={handleRatingChange}
                    />
                  </div>
                  <a
                    href="#"
                    className="text-sm pt-5 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Write a review
                  </a>
                </div>

                <form>
                  <OptionSelector
                    option={ChooseColor}
                    name="color"
                    title="Color"
                  />
                  <OptionSelector
                    option={ChooseSize}
                    name="size"
                    title="Size"
                  />
                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 px-8 max-w-full pb-4">
            <div className="my-6">
              <div className="lg:col-span-2 lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl py-2">
                  {productListById.name}
                </h1>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 ">
                  Description
                </h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {productListById.description}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Hand cut and sewn locally
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Dyed with our proprietary colors
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Pre-washed &amp; pre-shrunk
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Ultra-soft 100% cotton
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ShowReview reviews={reviews} productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};
