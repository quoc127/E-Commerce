import { AdminHeader } from "@/components/admin-view/header";
import { AdminDeleteDialog } from "@/components/common/admin-delete-dialog";
import { AdminFormProduct } from "@/components/common/admin-form-product";
import { AdminTable } from "@/components/common/admin-table";
import { AdminPagination } from "@/components/common/paginate";
import { useToast } from "@/hooks/use-toast";
import {
  deleteAdminProduct,
  editAdminProduct,
  getAdminAllProducts,
  getAdminProductsPagination,
  postAdminNewProduct,
} from "@/store/admin-slice/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const initialFormdata = {
  productName: "",
  price: "",
  description: "",
  productImage: "",
  totalProducts: "",
  brandName: "",
  categoryName: "",
};

export const AdminProduct = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { productsList, totalPages, totalItems } = useSelector(
    (state) => state.adminProducts
  );

  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isProductItemToDelete, setIsProductItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleOpenAddProduct = () => {
    setIsOpenSheet(true);
    setCurrentEditedId(null)
    setFormData(initialFormdata)
  };

  const handleEditProduct = (product) => {
    setFormData({
      productName: product.name,
      price: product.price,
      description: product.description,
      productImage: product.image,
      totalProducts: product.total,
      brandName: product.brandId,
      categoryName: product.categoryId,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editAdminProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              toast({
                title: data.payload.message,
              });
              setIsOpenSheet(false);
              setFormData(initialFormdata);
              dispatch(
                getAdminProductsPagination({
                  page: currentPage,
                  limit: itemsPerPage,
                })
              );
            } else {
              toast({ title: data.payload.message, variant: "destructive" });
            }
          }
        )
      : dispatch(postAdminNewProduct(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({ title: data.payload.message });
            setIsOpenSheet(false);
            setFormData(initialFormdata);
            dispatch(
              getAdminProductsPagination({
                page: currentPage,
                limit: itemsPerPage,
              })
            );
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        });
  };

  useEffect(() => {
    if (isConfirmDelete) {
      dispatch(deleteAdminProduct(isProductItemToDelete._id)).then((data) => {
        if (data.payload.success) {
          toast({
            title: data.payload.message,
          });
          dispatch(
            getAdminProductsPagination({
              page: currentPage,
              limit: itemsPerPage,
            })
          );
        }
      });
      setIsConfirmDelete(false);
    }
  }, [isConfirmDelete]);

  useEffect(() => {
    dispatch(
      getAdminProductsPagination({ page: currentPage, limit: itemsPerPage })
    );
  }, [dispatch, currentPage, itemsPerPage]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AdminHeader />
        <AdminTable
          isProduct={true}
          buttonText={"Add Product"}
          titleText={"Products"}
          handleOpenAdd={handleOpenAddProduct}
          itemsList={productsList}
          setCurrentEditedId={setCurrentEditedId}
          setIsOpenSheet={setIsOpenSheet}
          setIsOpenAlert={setIsOpenAlert}
          handleDelete={setIsProductItemToDelete}
          handleEdit={handleEditProduct}
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
          istemToDelete={isProductItemToDelete}
          setIsConfirmDelete={setIsConfirmDelete}
        />

        <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId ? "Edit Product" : "Add New Product"}
              </SheetTitle>
              <SheetDescription></SheetDescription>
              <AdminFormProduct
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                setIsOpenSheet={setIsOpenSheet}
                currentEditedId={currentEditedId}
                initialFormdata={initialFormdata}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
