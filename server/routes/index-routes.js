const authRoutes = require("../routes/auth/auth-routes");
const brandRoutes = require("../routes/admin/brand/brand-routes");
const categoryRoutes = require("../routes/admin/category/category-routes");

module.exports = (app) => {
  // Auth User
  app.use("/api/user", authRoutes);

  // Brand
  app.use("/api/brand", brandRoutes);

  // Brand
  app.use("/api/category", categoryRoutes);
};
