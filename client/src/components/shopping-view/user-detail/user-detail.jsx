import {
  UserDetailTabConfig,
} from "@/config/shop-user-detail";
import { useToast } from "@/hooks/use-toast";
import { changePasswordUser } from "@/store/auth-slice";
import {
  getShopAddress,
  patchShopAddress,
  postShopAddress,
} from "@/store/shop-slice/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserDetailTab } from "./user-detail-tab";

const initialFormdataChangePassword = {
  email: "",
  password: "",
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
          dispatch(getShopAddress({ userId: user.id }));
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
            dispatch(getShopAddress({ userId: user.id }));
            toast({
              title: "Address added successfully",
            });
          }
        }
      );
    }
  };

  const onSubmitChangePassword = (event) => {
    event.preventDefault();
    dispatch(changePasswordUser(formDataChangePassword)).then((data) => {
      if (data.payload.success) {
        toast({ title: data.payload.message });
      }
    });
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

  return (
    <div className="flex min-h-[300px]">
      <div className="min-w-80 bg-gray-100 p-4">
        <ul className="space-y-4">
          {UserDetailTabConfig && UserDetailTabConfig.length > 0
            ? UserDetailTabConfig.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 rounded ${
                      activeTab === item.tab
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleTabChange(item.tab)}
                  >
                    {item.label}
                  </li>
                );
              })
            : ""}
        </ul>
      </div>

      <div
        className={`${activeTab === "accountInfo" ? "w-full" : "w-1/3 "} p-4`}
      >
        <UserDetailTab
          activeTab={activeTab}
          formDataInfo={formDataInfo}
          setFormDataInfo={setFormDataInfo}
          onSubmit={onSubmit}
          formDataAddress={formDataAddress}
          setFormDataAddress={setFormDataAddress}
          onSubmitAddress={onSubmitAddress}
          formDataChangePassword={formDataChangePassword}
          setFormDataChangePassword={setFormDataChangePassword}
          onSubmitChangePassword={onSubmitChangePassword}
        />
      </div>
    </div>
  );
};
