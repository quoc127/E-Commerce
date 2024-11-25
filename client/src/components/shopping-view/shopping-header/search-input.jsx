import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SearchInput = ({
  keyword,
  setKeyword,
  searchResults,
  completeSearch,
  setCompleteSearch,
  handleInput,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={keyword}
        onKeyDown={(event) => {
          if (event.key === "Enter" && keyword && searchResults) {
            navigate("/shop/products-list");
            setCompleteSearch(true);
          }
        }}
        onChange={(event) => {
          handleInput(event);
          setCompleteSearch(false);
        }}
        type="search"
        placeholder="Search..."
        className="w-full pl-8 md:w-[300px] lg:w-[336px]"
      />
      {keyword && Array.isArray(searchResults) && searchResults.length > 0 ? (
        <div
          className={`${
            completeSearch ? "hidden" : "block"
          } absolute z-10 mt-2 w-full max-h-[300px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg`}
        >
          {searchResults.map((item, index) => (
            <div key={index} className="flex flex-row m-2 pb-2 border-b-2">
              <img src={item.image} width="50px" className="object-cover" />
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm w-full"
                onClick={() => {
                  navigate(`/shop/product-detail/${item._id}`);
                  setKeyword("");
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={` ${
          Array.isArray(searchResults) ? "hidden" : "block"
          } m-2 pb-2 border-b-2`}>
          Not found product
        </div>
      )}
    </div>
  );
};
