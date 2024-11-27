import { CommonForm } from "@/components/common/form";
import {
  UserDetailAddress,
  UserDetailChangePassword,
  UserDetailInfo,
} from "@/config/shop-user-detail";
import { useToast } from "@/hooks/use-toast";
import {
  getShopAddress,
  patchShopAddress,
  postShopAddress,
} from "@/store/shop-slice/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormdataChangePassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialFormDataAddress = {
  country: "",
  city: "",
  address: "",
  phoneNumber: "",
};

export const UserDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const initialFormdataInfo = {
    userName: user.userName,
    email: user.email,
  };
  const [activeTab, setActiveTab] = useState("accountInfo");
  const [formDataInfo, setFormDataInfo] = useState(initialFormdataInfo);
  const [formDataChangePassword, setFormDataChangePassword] = useState(
    initialFormdataChangePassword
  );
  const [formDataAddress, setFormDataAddress] = useState(
    initialFormDataAddress
  );

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onSubmitAddress = (event) => {
    event.preventDefault();
    if (addressList.length > 0) {
      dispatch(
        patchShopAddress({
          userId: user.id,
          addressId: addressList[0]._id,
          ...formDataAddress,
        })
      ).then((data) => {
        if (data.payload.success) {
          toast({
            title: "Address updated successfully",
          });
        }
      });
    } else {
      dispatch(postShopAddress({ ...formDataAddress, userId: user.id })).then(
        (data) => {
          if (data.payload.success) {
            setFormDataAddress(initialFormDataAddress);
            toast({
              title: "Address added successfully",
            });
          }
        }
      );
    }
  };

  useEffect(() => {
    if (addressList.length > 0) {
      setFormDataAddress({
        country: addressList[0].country,
        city: addressList[0].city,
        address: addressList[0].address,
        phoneNumber: addressList[0].phoneNumber,
      });
    }
  }, [addressList]);

  useEffect(() => {
    dispatch(getShopAddress({ userId: user.id }));
  }, [dispatch, user.id]);
console.log(formDataAddress);

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

      <div className="w-full p-4">
        {activeTab === "accountInfo" && (
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
