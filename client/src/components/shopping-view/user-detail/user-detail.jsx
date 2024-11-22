import { CommonForm } from "@/components/common/form";
import { UserDetailChangePassword, UserDetailInfo } from "@/config/shop-user-detail";
import { useState } from "react";
import { useSelector } from "react-redux";

const initialFormdataChangePassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const UserDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const initialFormdataInfo = {
    userName: user.userName,
    email: user.email,
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
  };
  const [activeTab, setActiveTab] = useState("accountInfo");
  const [formDataInfo, setFormDataInfo] = useState(initialFormdataInfo);
  const [formDataChangePassword, setFormDataChangePassword] = useState(initialFormdataChangePassword);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
console.log("formDataInfo",formDataInfo);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex h-auto">
      <div className="w-1/4 bg-gray-100 p-4">
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "accountInfo" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleTabChange("accountInfo")}
          >
            Account Info
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "changePassword" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleTabChange("changePassword")}
          >
            Change Password
          </li>
        </ul>
      </div>

      <div className="w-1/3 p-4">
        {activeTab === "accountInfo" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Account Info</h2>
            <CommonForm
              hideChangeAndResetPassword={true}
              isUserDetail={true}
              formControls={UserDetailInfo}
              formData={formDataInfo}
              setFormData={setFormDataInfo}
              buttonText={"Save Change"}
              onSubmit={onSubmit}
              isBtnDisabled={false}
            />
          </div>
        )}

        {activeTab === "changePassword" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <CommonForm
              hideChangeAndResetPassword={true}
              isUserDetail={true}
              formControls={UserDetailChangePassword}
              formData={formDataChangePassword}
              setFormData={setFormDataChangePassword}
              buttonText={"Save Change"}
              onSubmit={onSubmit}
              isBtnDisabled={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
