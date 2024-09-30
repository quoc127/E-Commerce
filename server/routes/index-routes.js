const authRoutes = require("../routes/auth/auth-routes")

module.exports = (app) => {
  // Auth User
  app.use("/api/user", authRoutes)
}