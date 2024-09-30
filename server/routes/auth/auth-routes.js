const express = require("express");
const route = express.Router();

const controller = require("../../controllers/auth/auth-controller");
const validate = require("../../validates/auth/auth-validates");

route.post("/register", validate.RegisterValidate, controller.register);
route.post("/login", controller.login);
route.patch("/change-password", validate.ChangePasswordValidate, controller.changePassword);
route.post("/forgot-password", validate.ForgotPasswordValidate,controller.fotgotPassword);
route.patch("/reset-password", validate.ResetPasswordValidate,controller.resetPassword)
module.exports = route;
