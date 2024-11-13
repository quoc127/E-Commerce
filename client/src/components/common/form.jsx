import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectItem } from "../ui/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Link } from "react-router-dom";
import { useState } from "react";

export const CommonForm = ({
  hideChangeAndResetPassword,
  formControls,
  formData,
  setFormData,
  buttonText,
  onSubmit,
  isBtnDisabled,
  currentEditedId,
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    setFormData((prevValues) => ({
      ...prevValues,
      image: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setFormData((prevValues) => ({
      ...prevValues,
      image: null,
    }));
    setPreviewImage(null);
  };

  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "file":
        element = (
          <div className="sm:col-span-2">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {previewImage || currentEditedId ? (
                  <div className="relative">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <img
                        src={
                          typeof formData.image === "string"
                            ? formData.image
                            : previewImage
                        }
                        alt="Preview"
                        className="mx-auto h-48 w-48 object-cover"
                      />
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleChangeFile}
                        className="sr-only"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-[-30px] right-[-50px] bg-gray-500 text-white rounded-full p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer"
                  >
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleChangeFile}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        );
        break;

      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem, index) => {
                    return (
                      <SelectItem key={index} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem, index) => {
          return (
            <div key={index} className="grid w-full gap-1.5">
              <Label className="mb-1">{controlItem.label}</Label>
              {renderInputsByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between">
        <span className={hideChangeAndResetPassword ? "hidden" : "block"}>
          <Link
            className=" hover:underline hover:text-blue-300"
            to="/auth/change-password"
          >
            Change Password
          </Link>
        </span>
        <span className={hideChangeAndResetPassword ? "hidden" : "block"}>
          <Link
            className=" hover:underline hover:text-blue-300"
            to="/auth/forgot-password"
          >
            Forgot Password
          </Link>
        </span>
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};
