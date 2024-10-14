const authRoutes = require("../routes/auth/auth-routes");
const brandRoutes = require("../routes/admin/brand/brand-routes");
const categoryRoutes = require("../routes/admin/category/category-routes");
const productRoutes = require("./admin/product/product-routes");
const authorization = require("../middleware/check-authorization");

module.exports = (app) => {
  // Auth User
  app.use("/api/user", authRoutes);

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
};
