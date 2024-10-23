const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const categoryRoutes = require("./routes/category.routes");
const subcategoryRoutes = require("./routes/subcategory.routes");
const tutorialRoutes = require("./routes/tutorial.routes");
const videoRoutes = require("./routes/video.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
require("./models/associations");

console.log("Express loaded successfully");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
