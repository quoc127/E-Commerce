export const ShoppingFooter = () => {
  return (
    <footer>
      <div className="border-t">
        <div className="mb-5 cursor-pointer ">
          <h2 className="text-3xl text-center py-4 text-gray-900">E-Comerce</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 text-center items-center w-full lg:w-[600px] mx-auto text-gray-900">
            <div>Overview</div>
            <div>Products</div>
            <div>About</div>
            <div>Help</div>
            <div>Contact</div>
          </div>
        </div>
        <p className="text-center pb-4">copy by Nguyễn Quốc 2024</p>
      </div>
    </footer>
  );
};
