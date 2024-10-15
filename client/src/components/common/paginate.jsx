import ReactPaginate from "react-paginate";

export const AdminPagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };
  return (
    <div className="flex justify-center mt-4">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="inline-block mx-1"
        pageLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-gray-200"
        previousClassName="inline-block mx-1"
        previousLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-gray-200"
        nextClassName="inline-block mx-1"
        nextLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-gray-200 focus:outline-none"
        breakLabel="..."
        breakClassName="inline-block mx-1"
        breakLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-gray-200"
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center list-none p-0"
        activeClassName="bg-gray-300 text-white"
        renderOnZeroPageCount={null}
        forcePage={currentPage > totalPages ? totalPages - 1 : currentPage - 1}
      />
    </div>
  );
};
