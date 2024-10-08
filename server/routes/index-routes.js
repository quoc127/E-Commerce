const authRoutes = require("../routes/auth/auth-routes");
const brandRoutes = require("../routes/brand/brand-routes");

module.exports = (app) => {
  // Auth User
  app.use("/api/user", authRoutes);

  // Brand
  app.use("/api/brand", brandRoutes);
};
