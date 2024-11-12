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
import { useState } from "react";

const initialFormdata = {
  name: "",
  description: "",
};

export const AdminSlide = () => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
      <div className="text-end mx-6">
        <Button onClick={() => setIsOpenSheet(true)}>Add Image</Button>
      </div>
      <div className="md:w-96 mx-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <img src="http://res.cloudinary.com/djwaknffu/image/upload/v1729090470/E-commerce/products/fblvpoptniswbaq3zg8f.webp"></img>
            </CardTitle>
            <CardDescription className="text-center">
              image description
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>image name</p>
          </CardContent>
          <CardFooter className="justify-between">
          <Button>Edit</Button>
          <Button>Delete</Button>
          </CardFooter>
        </Card>
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
