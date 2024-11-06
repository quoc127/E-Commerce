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

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/products-list",
  },
  {
    id: "Street Style",
    label: "Street Style",
    path: "/shop/products-list",
  },
  {
    id: "Activewear",
    label: "Activewear",
    path: "/shop/products-list",
  },
  {
    id: "Outerwear",
    label: "Outerwear",
    path: "/shop/products-list",
  },
  {
    id: "Luxury Handbags",
    label: "Luxury Handbags",
    path: "/shop/products-list",
  },
  {
    id: "Accessories",
    label: "Accessories",
    path: "/shop/products-list",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const filterOptions = {
  Category: [
    { id: "Street Style", label: "Street Style" },
    { id: "Activewear", label: "Activewear" },
    { id: "Outerwear", label: "Outerwear" },
    { id: "Luxury Handbags", label: "Luxury Handbags" },
    { id: "Accessories", label: "Accessories" },
  ],
  Brand: [
    { id: "LuxeThreads", label: "LuxeThreads" },
    { id: "Elegante", label: "Elegante" },
    { id: "TrendVibe", label: "TrendVibe" },
    { id: "Gucci", label: "Gucci" },
    { id: "Louis Vuitton", label: "Louis Vuitton" },
    { id: "Chanel", label: "Chanel" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];