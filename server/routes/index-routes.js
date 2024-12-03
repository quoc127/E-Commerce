const authRoutes = require("../routes/auth/auth-routes");
const slideRoutes = require("../routes/admin/slide/slide-routes");
const brandRoutes = require("../routes/admin/brand/brand-routes");
const categoryRoutes = require("../routes/admin/category/category-routes");
const productRoutes = require("./admin/product/product-routes");
const authorization = require("../middleware/check-authorization");

const shopProductRoute = require("./shop/product/product-routes");
const shopCartRoute = require("./shop/cart/cart-routes");
const shopAddressRoute = require("./shop/address/address-routes");
const shopOrderRoute = require("./shop/order/order-routes");
const shopProductReviewRoute = require("./shop/product-review/product-review-routes");

module.exports = (app) => {
  // Auth User
  app.use("/api/user", authRoutes);

  // Admin
  // Slide
  app.use("/api/slide", authorization.verifyToken, slideRoutes);

  // Brand
  app.use(
    "/api/brand",
    authorization.verifyToken,
    authorization.adminRole,
    brandRoutes
  );

  // Category
  app.use(
    "/api/category",
    authorization.verifyToken,
    authorization.adminRole,
    categoryRoutes
  );

  // Product
  app.use(
    "/api/product",
    authorization.verifyToken,
    authorization.adminRole,
    productRoutes
  );

  //Shop
  // Product
  app.use(
    "/api/shop/product",
    authorization.verifyToken,
    authorization.userRole,
    shopProductRoute
  );

  // Cart
  app.use(
    "/api/shop/cart",
    authorization.verifyToken,
    authorization.userRole,
    shopCartRoute
  );

   // Address
   app.use(
    "/api/shop/address",
    authorization.verifyToken,
    authorization.userRole,
    shopAddressRoute
  );
  
   // Order
   app.use(
    "/api/shop/order",
    authorization.verifyToken,
    authorization.userRole,
    shopOrderRoute
  );

     // Product Review
     app.use(
      "/api/shop/product-review",
      authorization.verifyToken,
      authorization.userRole,
      shopProductReviewRoute
    );
};
