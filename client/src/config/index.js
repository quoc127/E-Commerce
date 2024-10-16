export const registerFormControls = [
  {
    name: "userName",
    Label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    Label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    Label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const changPasswordFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const forgotPasswordFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
];

export const resetPasswordFormControls = [
  {
    name: "otp",
    label: "OTP",
    placeholder: "Enter your OTP",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addBrandFormControls = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your brand name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "input",
    type: "text",
    placeholder: "Enter your description",
  },
];

export const addCategoryFormControls = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your category name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "input",
    type: "text",
    placeholder: "Enter your description",
  },
];

export const addProductFormControls = [
  {
    label: "Image",
    name: "image",
    componentType: "input",
    type: "text",
    placeholder: "Enter your image",
  },
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your product name",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter your price",
  },
  {
    label: "Description",
    name: "description",
    componentType: "input",
    type: "text",
    placeholder: "Enter your description",
  },
  {
    label: "Total",
    name: "total",
    componentType: "input",
    type: "number",
    placeholder: "Enter total product",
  },
  {
    label: "Brand Name",
    name: "brand-name",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
];