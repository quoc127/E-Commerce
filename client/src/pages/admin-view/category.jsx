import { AdminHeader } from "@/components/admin-view/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  getCategoriesPagination,
  postNewCategory,
} from "@/store/admin-slice/category-slice";
import { AdminPagination } from "@/components/common/paginate";
import { AdminDeleteDialog } from "@/components/common/admin-delete-dialog";

const initialFormdata = {
  name: "",
  description: "",
};
export const AdminCategory = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { categoryList, totalPages, totalItems } = useSelector(
    (state) => state.adminCategories
  );

  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isCateogryItemToDelete, setIsCateogryItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleOpenAddBrand = () => {
    setIsOpenSheet(true);
  };

  const handleEditCategory = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editCategory({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              toast({
                title: data.payload.message,
              });
              setIsOpenSheet(false);
              setFormData(initialFormdata);
              dispatch(
                getCategoriesPagination({
                  page: currentPage,
                  limit: itemsPerPage,
                })
              );
            } else {
              toast({ title: data.payload.message, variant: "destructive" });
            }
          }
        )
      : dispatch(postNewCategory(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({ title: data.payload.message });
            setIsOpenSheet(false);
            setFormData(initialFormdata);
            dispatch(
              getCategoriesPagination({
                page: currentPage,
                limit: itemsPerPage,
              })
            );
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        });
  };

  // const handleDeleteCategory = (categoryId) => {
  //   dispatch(deleteCategory(categoryId)).then((data) => {
  //     if (data.payload.success) {
  //       toast({
  //         title: data.payload.message,
  //       });
  //       dispatch(getCategories());
  //     }
  //   });
  // };

  useEffect(() => {
    if (isConfirmDelete) {
      dispatch(deleteCategory(isCateogryItemToDelete._id)).then((data) => {
        if (data.payload.success) {
          toast({
            title: data.payload.message,
          });
          dispatch(
            getCategoriesPagination({ page: currentPage, limit: itemsPerPage })
          );
        }
      });
      setIsConfirmDelete(false);
    }
  }, [isConfirmDelete]);

  useEffect(() => {
    dispatch(
      getCategoriesPagination({ page: currentPage, limit: itemsPerPage })
    );
  }, [dispatch, currentPage, itemsPerPage]);

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
        setIsOpenAlert={setIsOpenAlert}
        handleDelete={setIsCateogryItemToDelete}
        handleEdit={handleEditCategory}
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
        istemToDelete={isCateogryItemToDelete}
        setIsConfirmDelete={setIsConfirmDelete}
      />
      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Category" : "Add New Brand"}
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
