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
import {
  deleteCategory,
  editCategory,
  getCategories,
  postNewCategory,
} from "@/store/admin-slice/category-slice";

const initialFormdata = {
  name: "",
  description: "",
};
export const AdminCategory = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { categoryList } = useSelector((state) => state.adminCategories);

  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleOpenAddBrand = () => {
    setIsOpenSheet(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editCategory({ id: currentEditedId, formData })).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: data.payload.message,
            });
            setIsOpenSheet(false);
            setFormData(initialFormdata);
            dispatch(getCategories());
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        })
      : dispatch(postNewCategory(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({ title: data.payload.message });
            setIsOpenSheet(false);
            dispatch(getCategories());
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        });
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId)).then((data) => {
      if (data.payload.success) {
        toast({
          title: data.payload.message,
        });
        dispatch(getCategories());
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
      <AdminTable
        buttonText={"Add Category"}
        titleText={"Categories"}
        handleOpenAdd={handleOpenAddBrand}
        itemsList={categoryList}
        setCurrentEditedId={setCurrentEditedId}
        setIsOpenSheet={setIsOpenSheet}
        handleDelete={handleDeleteCategory}
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
