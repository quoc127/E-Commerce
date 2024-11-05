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
    id: "streetstyle",
    label: "Street Style",
    path: "/shop/products-list",
  },
  {
    id: "activewear",
    label: "Activewear",
    path: "/shop/products-list",
  },
  {
    id: "outerwear",
    label: "Outerwear",
    path: "/shop/products-list",
  },
  {
    id: "luxuryhandbags",
    label: "Luxury Handbags",
    path: "/shop/products-list",
  },
  {
    id: "accessories",
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
    { id: "streetstyle", label: "Street Style" },
    { id: "activewear", label: "Activewear" },
    { id: "outerwear", label: "Outerwear" },
    { id: "luxuryhandbags", label: "Luxury Handbags" },
    { id: "accessories", label: "Accessories" },
  ],
  Brand: [
    { id: "luxethreads", label: "LuxeThreads" },
    { id: "elegante", label: "Elegante" },
    { id: "trendVibe", label: "TrendVibe" },
    { id: "gucci", label: "Gucci" },
    { id: "louisvuitton", label: "Louis Vuitton" },
    { id: "chanel", label: "Chanel" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];