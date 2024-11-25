import { AdminPagination } from "@/components/common/paginate";
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
  clearProductListFilter,
  getShopFilterProducts,
  getShopProductsPagination,
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

const keyMapping = {
  Brand: "brandName",
  Category: "categoryName",
  Price: "price",
};

const applyFilters = (products, filters) => {
  let filteredProducts = products;

  for (const [key, values] of Object.entries(filters)) {
    if (Array.isArray(values) && values.length > 0) {
      const mappedKey = keyMapping[key] || key;
      filteredProducts = filteredProducts.filter((product) => {
        const productValue = product[mappedKey];
        return productValue && values.includes(productValue);
      });
    }
  }

  return filteredProducts;
};

export const ProductsList = ({
  searchResults,
  completeSearch,
  totalPagesSearch,
  itemsPerPageSearch,
  currentPageSearch,
  setCurrentPageSearch,
  isSearch,
}) => {
  const {
    productList,
    productListFilter,
    totalPages,
    totalPagesFilter,
    totalItems,
  } = useSelector((state) => state.shopProducts);
  
  const dispatch = useDispatch();
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("Category");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPageFilter, setCurrentPageFilter] = useState(1);
  const [itemsPerPageFilter, setItemsPerPageFilter] = useState(8);

  const handleSort = (value) => {
    setSort(value);
    let sortedResults = [...filteredSearchResults];

    switch (value) {
      case "price-lowtohigh":
        sortedResults.sort((a, b) => a.price - b.price);
        break;
      case "price-hightolow":
        sortedResults.sort((a, b) => b.price - a.price);
        break;
      case "title-atoz":
        sortedResults.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        );
        break;
      case "title-ztoa":
        sortedResults.sort((a, b) =>
          b.name.localeCompare(a.name, "en", { sensitivity: "base" })
        );
        break;
      default:
        break;
    }

    setFilteredSearchResults(sortedResults);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
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
    setFilters(copyFilters);
    const updatedResults = applyFilters(searchResults, copyFilters);
    setFilteredSearchResults(updatedResults);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (completeSearch && searchResults) {
      setFilteredSearchResults(searchResults);
    }
  }, [completeSearch, searchResults]);

  useEffect(() => {
    if (
      filters !== null &&
      sort !== null
    ) {
      dispatch(
        getShopFilterProducts({ filterParams: filters, sortParams: sort, page: currentPageFilter, limit: itemsPerPageFilter })
      );
    } else {
      dispatch(clearProductListFilter());
    }
  }, [dispatch, sort, filters, currentPageFilter, itemsPerPageFilter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            {completeSearch ? (
              <>
                <span className="text-muted-foreground">
                  {filteredSearchResults.length} Products
                </span>
              </>
            ) : productListFilter.length > 0 ? (
              <>
                <span className="text-muted-foreground">
                  {productListFilter.length} Products
                </span>
              </>
            ) : (
              <>
                <span className="text-muted-foreground">
                  {productList.length} Products
                </span>
              </>
            )}

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
          {completeSearch ? (
            filteredSearchResults && filteredSearchResults.length > 0 ? (
              filteredSearchResults.map((productItem, index) => (
                <ShoppingProductTile key={index} productItem={productItem} />
              ))
            ) : (
              <div>No products found after search.</div>
            )
          ) : productListFilter.length > 0 ? (
            productListFilter && productListFilter.length > 0 ? (
              productListFilter.map((productItem, index) => (
                <ShoppingProductTile key={index} productItem={productItem} />
              ))
            ) : (
              <div>No products found after filtering.</div>
            )
          ) : productList && productList.length > 0 ? (
            productList.map((productItem, index) => (
              <ShoppingProductTile key={index} productItem={productItem} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
        <AdminPagination
          totalPages={isSearch && Array.isArray(searchResults) ? totalPagesSearch : productListFilter.length > 0 ? totalPagesFilter : totalPages}
          currentPage={isSearch && Array.isArray(searchResults) ? currentPageSearch : productListFilter.length > 0 ? currentPageFilter : currentPage}
          setCurrentPage={isSearch && Array.isArray(searchResults) ? setCurrentPageSearch : productListFilter.length > 0 ? setCurrentPageFilter : setCurrentPage}
          itemsPerPage={isSearch && Array.isArray(searchResults) ? itemsPerPageSearch : productListFilter.length > 0 ? itemsPerPageFilter : itemsPerPage}
        />
      </div>
    </div>
  );
};
