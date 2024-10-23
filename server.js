const express = require("express");

const helmet = require("helmet");

const swaggerOptions = require("./swagger/swaggerOptions");

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
const coachRoutes = require("./routes/coach.routes");
const newsRoutes = require("./routes/news.routes");

console.log("Associations loaded");
require("./models/associations");

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);

app.get("/", (req, res) => {
  res.send("API FFAVIRON ");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/news", newsRoutes);

app.get("/set-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public/set-password.html"));
});

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
