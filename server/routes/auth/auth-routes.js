const express = require("express");
const route = express.Router();

const controller = require("../../controllers/auth/auth-controller");
const validate = require("../../validates/auth/auth-validates");

route.post("/register", validate.RegisterValidate, controller.register);
route.post("/login", controller.login);

module.exports = route;
