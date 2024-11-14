import { AdminHeader } from "@/components/admin-view/header";
import { AdminDeleteDialog } from "@/components/common/admin-delete-dialog";
import { AdminFormProduct } from "@/components/common/admin-form-product";
import { CommonForm } from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addImageSlideFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  deleteAdminImageSlide,
  editAdminImageSlide,
  getAdminAllImageSlide,
  postAdminImage,
} from "@/store/admin-slice/slide-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormdata = {
  image: "",
  name: "",
  description: "",
};

export const AdminSlide = () => {
  const { imageSlideList } = useSelector((state) => state.adminSlide);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isImageToDelete, setIsImageToDelete] = useState(null);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleEditSlide = (slide) => {
    setFormData({
      image: slide.image,
      name: slide.name,
      description: slide.description,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editAdminImageSlide({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              toast({
                title: data.payload.message,
              });
              setIsOpenSheet(false);
              setFormData(initialFormdata);
              dispatch(getAdminAllImageSlide());
            } else {
              toast({ title: data.payload.message, variant: "destructive" });
            }
          }
        )
      : dispatch(postAdminImage(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({ title: data.payload.message });
            setFormData(initialFormdata);
            dispatch(getAdminAllImageSlide());
            setIsOpenSheet(false);
          } else {
            toast({ title: data.payload.message, variant: "destructive" });
          }
        });
  };

  useEffect(() => {
    if (isConfirmDelete) {
      dispatch(deleteAdminImageSlide(isImageToDelete)).then((data) => {
        if (data.payload.success) {
          toast({
            title: data.payload.message,
          });
          dispatch(getAdminAllImageSlide());
        }
      });
      setIsConfirmDelete(false);
    }
  }, [isConfirmDelete]);

  useEffect(() => {
    dispatch(getAdminAllImageSlide());
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
      <div className="text-center md:text-end mx-6 my-2">
        <Button
          className={
            imageSlideList.length >= 6 ? "w-full opacity-50 cursor-not-allowed" : "w-full text-center md:w-40"
          }
          disabled={imageSlideList.length >= 6}
          onClick={() => setIsOpenSheet(true)}
        >
          Add Image
        </Button>
        <span className={imageSlideList.length >= 6 ? "text-red-700 lg:mr-4 text-center" : "hidden"}>
          Banner no more than 6 images
        </span>
      </div>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-1 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 ">
        {imageSlideList && imageSlideList.length > 0
          ? imageSlideList.map((slide, index) => {
              return (
                <div key={index} className="md:w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <img
                          className="h-48 object-cover md:w-full"
                          src={slide.image}
                        ></img>
                      </CardTitle>
                      <CardDescription className="text-center">
                        {slide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p>{slide.name}</p>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button
                        onClick={() => {
                          setIsOpenSheet(true);
                          setCurrentEditedId(slide._id);
                          handleEditSlide(slide);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setIsImageToDelete(slide);
                          setIsOpenAlert(true);
                        }}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              );
            })
          : null}
      </div>

      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add Image Slide</SheetTitle>
            <SheetDescription></SheetDescription>
            <CommonForm
              hideChangeAndResetPassword={true}
              formControls={addImageSlideFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Save Change" : "Add Image"}
              onSubmit={onSubmit}
              isBtnDisabled={false}
              currentEditedId={currentEditedId}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <AdminDeleteDialog
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        istemToDelete={isImageToDelete}
        setIsConfirmDelete={setIsConfirmDelete}
      />
    </div>
  );
};
