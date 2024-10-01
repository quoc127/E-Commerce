const express = require("express");
const route = express.Router();

const controller = require("../../controllers/auth/auth-controller");
const validate = require("../../validates/auth/auth-validates");
const checkAuth = require("../../middleware/check-auth");

route.post("/register", validate.RegisterValidate, controller.register);
route.post("/login", controller.login);
route.post("/logout", controller.logout);
route.patch(
  "/change-password",
  validate.ChangePasswordValidate,
  controller.changePassword
);
route.post(
  "/forgot-password",
  validate.ForgotPasswordValidate,
  controller.fotgotPassword
);
route.patch(
  "/reset-password",
  validate.ResetPasswordValidate,
  controller.resetPassword
);

route.get("/check-auth", checkAuth.authMiddleware, controller.authMiddleware);

module.exports = route;
