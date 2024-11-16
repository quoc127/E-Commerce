export const OptionSelector = ({ option, name, title }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mt-4">{title}</h3>
      <div aria-label={`Choose a ${name}`} className="mt-4">
        <div className="flex space-x-3">
          {option && option.length > 0
            ? option.map((item, index) => {
                return (
                  <div key={index} className="items-center">
                    <input
                      type="radio"
                      name="color"
                      value={item.value}
                      className="mr-1 w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.color}
                    </label>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};