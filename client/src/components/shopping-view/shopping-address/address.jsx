import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommonForm } from "@/components/common/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addressFormControls } from "@/config/shopping-address";
import AddressCard from "./address-card";
import {
  deleteShopAddress,
  getShopAddress,
  patchShopAddress,
  postShopAddress,
} from "@/store/shop-slice/address-slice";

const initialAddressFormData = {
  country: "",
  city: "",
  address: "",
  phoneNumber: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const handleManageAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
        patchShopAddress({
            userId: user.id,
            addressId: currentEditedId,
            ...formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            console.log("dât", data);
            
            dispatch(getShopAddress({ userId: user.id }));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(postShopAddress({ userId: user.id, ...formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(getShopAddress({ userId: user.id }));
              setFormData(initialAddressFormData);
              toast({
                title: "Address added successfully",
              });
            }
          }
        );
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteShopAddress({ userId: user.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getShopAddress({ userId: user.id }));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  };

  const handleEditAddress = (getCuurentAddress) => {
    setCurrentEditedId(getCuurentAddress._id);
    setFormData({
      ...formData,
      city: getCuurentAddress.city,
      country: getCuurentAddress.country,
      address: getCuurentAddress.address,
      phoneNumber: String(getCuurentAddress.phoneNumber),
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(getShopAddress({ userId: user.id }));
  }, [dispatch, user.id]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem, index) => (
              <AddressCard
                key={index}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          hideChangeAndResetPassword={true}
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
