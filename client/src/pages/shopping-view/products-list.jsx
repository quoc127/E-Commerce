import { ProductFilter } from "@/components/shopping-view/filter";
import { ShoppingProductTile } from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  getShopAllProducts,
  getShopFilterProducts,
} from "@/store/shop-slice/products-slice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("$");
};

export const ProductsList = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    console.log("getSectionId",getSectionId);
    console.log("getCurrentOption",getCurrentOption);
    
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentSection =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentSection === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentSection, 1);
      }
    }
    setFilters(copyFilters)
    sessionStorage.setItem("filters", JSON.stringify(copyFilters))
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        getShopFilterProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    dispatch(getShopAllProducts());
  }, [dispatch]);

  console.log("filters", filters);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem, index) => {
                    return (
                      <DropdownMenuRadioItem
                        key={index}
                        value={sortItem.id}
                        className="cursor-pointer"
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-5">
          {productList && productList.length > 0
            ? productList.map((productItem, index) => {
                return (
                  <ShoppingProductTile key={index} productItem={productItem} />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
