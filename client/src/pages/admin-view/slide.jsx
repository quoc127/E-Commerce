import { AdminHeader } from "@/components/admin-view/header";
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
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(postAdminImage(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        setFormData(initialFormdata);
        dispatch(getAdminAllImageSlide());
      } else {
        toast({ title: data.payload.message, variant: "destructive" });
      }
    });
  };

  useEffect(() => {
    dispatch(getAdminAllImageSlide());
  }, [dispatch]);

  console.log("imageSlideList", imageSlideList);
  console.log("formData", formData);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
      <div className="text-end mx-6">
        <Button onClick={() => setIsOpenSheet(true)}>Add Image</Button>
      </div>
      <div className="grid grid-cols-3 gap-y-4">
        {imageSlideList && imageSlideList.length > 0
          ? imageSlideList.map((slide, index) => {
              return (
                <div key={index} className="md:w-96 mx-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <img src={slide.image}></img>
                      </CardTitle>
                      <CardDescription className="text-center">
                        {slide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p>{slide.name}</p>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <Button>Edit</Button>
                      <Button>Delete</Button>
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
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
