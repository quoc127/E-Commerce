import { AdminHeader } from "@/components/admin-view/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteBrand,
  editBrand,
  getBrands,
  getBrandsPagination,
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
import { AdminPagination } from "@/components/common/paginate";
import { AdminDeleteDialog } from "@/components/common/admin-delete-dialog";

const initialFormdata = {
  name: "",
  description: "",
};
export const AdminBrand = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { brandList, totalPages, totalItems } = useSelector(
    (state) => state.adminBrands
  );

  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isBrandItemToDelete, setIsBrandItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleOpenAddBrand = () => {
    setIsOpenSheet(true);
    setCurrentEditedId(null)
    setFormData(initialFormdata)
  };

  const handleEditBrand = (brand) => {
    setFormData({
      name: brand.name,
      description: brand.description,
    });
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
            dispatch(
              getBrandsPagination({ page: currentPage, limit: itemsPerPage })
            );
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        })
      : dispatch(postNewBrand(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({ title: data.payload.message });
            setIsOpenSheet(false);
            setFormData(initialFormdata);
            dispatch(
              getBrandsPagination({ page: currentPage, limit: itemsPerPage })
            );
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        });
  };

  useEffect(() => {
    if (isConfirmDelete) {
      dispatch(deleteBrand(isBrandItemToDelete._id)).then((data) => {
        if (data.payload.success) {
          toast({
            title: data.payload.message,
          });
          dispatch(
            getBrandsPagination({ page: currentPage, limit: itemsPerPage })
          );
        }
      });
      setIsConfirmDelete(false);
    }
  }, [isConfirmDelete]);

  useEffect(() => {
    dispatch(getBrandsPagination({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
      <AdminTable
        buttonText={"Add Brand"}
        titleText={"Brands"}
        handleOpenAdd={handleOpenAddBrand}
        itemsList={brandList}
        setCurrentEditedId={setCurrentEditedId}
        setIsOpenSheet={setIsOpenSheet}
        setIsOpenAlert={setIsOpenAlert}
        handleDelete={setIsBrandItemToDelete}
        handleEdit={handleEditBrand}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <AdminPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      <AdminDeleteDialog
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        istemToDelete={isBrandItemToDelete}
        setIsConfirmDelete={setIsConfirmDelete}
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
