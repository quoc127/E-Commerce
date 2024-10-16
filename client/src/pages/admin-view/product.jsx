import { AdminHeader } from "@/components/admin-view/header";
import { AdminDeleteDialog } from "@/components/common/admin-delete-dialog";
import { AdminTable } from "@/components/common/admin-table";
import { AdminPagination } from "@/components/common/paginate";
import { useToast } from "@/hooks/use-toast";
import {
  deleteAdminProduct,
  getAdminAllProducts,
  getAdminProductsPagination,
} from "@/store/admin-slice/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormdata = {
  name: "",
  price: 0,
  description: "",
  image: "",
  total: 0,
  status: "",
  brandId: "",
  categoryId: "",
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
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const handleOpenAddProduct = () => {
    setIsOpenSheet(true);
  };

  const handleEditProduct = (brand) => {
    setFormData({
      name: brand.name,
      description: brand.description,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
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
      </div>
    </div>
  );
};
