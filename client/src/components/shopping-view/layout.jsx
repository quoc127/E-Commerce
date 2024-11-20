import { Outlet } from "react-router-dom";
import { ShoppingHeader } from "./shopping-header";
import { ShoppingFooter } from "./shopping-footer";

export const ShoppingLayout = ({
  keyword,
  setKeyword,
  searchResults,
  completeSearch,
  setCompleteSearch,
  handleInput,
}) => {
  return (
    <div className="flex flex-col bg-white">
      <ShoppingHeader
        keyword={keyword}
        setKeyword={setKeyword}
        searchResults={searchResults}
        completeSearch={completeSearch}
        setCompleteSearch={setCompleteSearch}
        handleInput={handleInput}
      />
      <main className="flex flex-col w-full">
        <Outlet number={1} />
      </main>
      <ShoppingFooter />
    </div>
  );
};
