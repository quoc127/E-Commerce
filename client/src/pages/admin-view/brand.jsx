import { AdminHeader } from "@/components/admin-view/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteBrand,
  editBrand,
  getBrands,
  postNewBrand,
} from "@/store/admin-slice/brands-slice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CommonForm } from "@/components/common/form";
import { addBrandFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { AdminTable } from "@/components/common/admin-table";

const initialFormdata = {
  name: "",
  description: "",
};
export const AdminBrand = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { brandList } = useSelector((state) => state.adminBrands);

  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleOpenAddBrand = () => {
    setIsOpenSheet(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editBrand({ id: currentEditedId, formData })).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: data.payload.message,
            });
            setIsOpenSheet(false);
            setFormData(initialFormdata);
            dispatch(getBrands());
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        })
      : dispatch(postNewBrand(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({ title: data.payload.message });
            setIsOpenSheet(false);
            dispatch(getBrands());
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        });
  };

  const handleDeleteBrand = (brandId) => {
    dispatch(deleteBrand(brandId)).then((data) => {
      if (data.payload.success) {
        toast({
          title: data.payload.message,
        });
        dispatch(getBrands());
      }
    });
  };

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
      <AdminTable
        handleOpenAdd={handleOpenAddBrand}
        itemsList={brandList}
        setCurrentEditedId={setCurrentEditedId}
        setIsOpenSheet={setIsOpenSheet}
        handleDelete={handleDeleteBrand}
      />
      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Brand" : "Add New Brand"}
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <CommonForm
              hideChangeAndResetPassword={true}
              formControls={addBrandFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Save Change" : "Add New Brand"}
              onSubmit={onSubmit}
              isBtnDisabled={false}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
