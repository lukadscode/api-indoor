try {
  const express = require("express");
  console.log("Express loaded successfully");
} catch (error) {
  console.error("Error loading express:", error);
}

try {
  const helmet = require("helmet");
  console.log("Helmet loaded successfully");
} catch (error) {
  console.error("Error loading helmet:", error);
}

try {
  const swaggerOptions = require("./swagger/swaggerOptions");
  console.log("Swagger options loaded successfully");
} catch (error) {
  console.error("Error loading swagger options:", error);
  console.trace(error); // Ajoute une trace de la pile complète
}

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

console.log("Associations loaded");
require("./models/associations");

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database successful");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
