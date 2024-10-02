import { CommonForm } from "@/components/common/form";
import { changPasswordFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { changePasswordUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export const AuthChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  //   event.preventDefault();
  //   dispatch(changePasswordUser(formData)).then((data) => {
  //     console.log("data", data);
  //     if (data?.payload?.success) {
  //       toast({
  //         title: data?.payload?.message,
  //       });
  //       navigate("/auth/login")
  //     } else {
  //       toast({
  //         title: data?.payload?.message,
  //         variant: "destructive",
  //       });
  //     }
  //   });
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(changePasswordUser(formData))
      .then((data) => {
        console.log("changePasswordUser", data);
        
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Change password your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={changPasswordFormControls}
        buttonText={"Change Password"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={false}
      />
    </div>
  );
};
