import { useEffect, useState } from "react";
import BannerOne from "../../assets/banner-1.webp";
import BannerTwo from "../../assets/banner-2.webp";
import BannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ShoppingProductTile } from "@/components/shopping-view/product-tile";
import { useDispatch, useSelector } from "react-redux";
import { getShopAllNewProducts } from "@/store/shop-slice/products-slice";
import { useNavigate } from "react-router-dom";
import { getCommonAllImageSlide } from "@/store/common-slice/slide-slice";

const banners = [BannerOne, BannerTwo, BannerThree];

export const ShoppingHome = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const { imageSlideList } = useSelector((state) => state.commonSlide);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  useEffect(() => {
    dispatch(getShopAllNewProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCommonAllImageSlide());
  }, [dispatch]);
  
  return (
    <div className="flex flex-col p-6">
      <div className="relative w-full h-[100px] overflow-hidden md:h-[300px] lg:h-[500px] object-cover">
        {imageSlideList && imageSlideList.length > 0
          ? imageSlideList.map((slide, index) => (
              <img
                src={slide.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + banners.length) % banners.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="gap-6 p-4 md:p-6">
        <h2 className="text-3xl font-bold text-center mb-8">New Products</h2>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => {
                  return (
                    <ShoppingProductTile
                      key={index}
                      productItem={productItem}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </section>
    </div>
  );
};
