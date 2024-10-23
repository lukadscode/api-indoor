const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const sequelize = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger/swaggerOptions");
const categoryRoutes = require("./routes/category.routes");
const subcategoryRoutes = require("./routes/subcategory.routes");
const tutorialRoutes = require("./routes/tutorial.routes");
const videoRoutes = require("./routes/video.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const newsRoutes = require("./routes/news.routes");
const coachRoutes = require("./routes/coach.routes");
const encryptRoutes = require("./routes/encrypt.routes");

// Importer les associations
const { Category, Subcategory } = require("./associations"); // Importer associations.js ici

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware de sécurité et parsing
app.use(helmet());
app.use(express.json());

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api", encryptRoutes);

// Connexion à la base de données et synchronisation des modèles
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

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
