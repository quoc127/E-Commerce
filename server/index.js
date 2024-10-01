require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

const bodyParser = require("body-parser");
// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Databasse
const { dbConnect } = require("./config/DBconnect");
dbConnect();

// Routes
const RoutesAPIVer1 = require("./routes/index-routes");
RoutesAPIVer1(app);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
