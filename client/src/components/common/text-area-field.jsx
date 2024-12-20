export const TextAreaField = ({ label, name, value, onChange }) => {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows="3"
          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        ></textarea>
      </div>
    </div>
  );
};
