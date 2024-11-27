import { CommonForm } from "@/components/common/form";
import {
  UserDetailAddress,
  UserDetailChangePassword,
  UserDetailInfo,
} from "@/config/shop-user-detail";
import { useSelector } from "react-redux";

export const UserDetailTab = ({
  activeTab,
  formDataInfo,
  setFormDataInfo,
  onSubmit,
  formDataAddress,
  setFormDataAddress,
  onSubmitAddress,
  formDataChangePassword,
  setFormDataChangePassword,
  onSubmitChangePassword,
}) => {
  const { addressList } = useSelector((state) => state.shopAddress);
  return (
    <div>
      {(() => {
        switch (activeTab) {
          case "accountInfo":
            return (
              <div className="grid grid-cols-2 gap-4">
                <div className="max-w-[500px]">
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
                <div className="max-w-[500px]">
                  <h2 className="text-xl font-bold mb-4">Account Address</h2>
                  <CommonForm
                    hideChangeAndResetPassword={true}
                    isUserDetail={true}
                    formControls={UserDetailAddress}
                    formData={formDataAddress}
                    setFormData={setFormDataAddress}
                    buttonText={
                      addressList.length > 0 ? "Save Change" : "Add Address"
                    }
                    onSubmit={onSubmitAddress}
                    isBtnDisabled={false}
                  />
                </div>
              </div>
            );
          case "changePassword":
            return (
              <div>
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <CommonForm
                  hideChangeAndResetPassword={true}
                  isUserDetail={true}
                  formControls={UserDetailChangePassword}
                  formData={formDataChangePassword}
                  setFormData={setFormDataChangePassword}
                  buttonText={"Save Change"}
                  onSubmit={onSubmitChangePassword}
                  isBtnDisabled={false}
                />
              </div>
            );
          default:
            return <div>No content available</div>;
        }
      })()}
    </div>
  );
};
