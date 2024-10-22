const { Sequelize } = require("sequelize");
require("dotenv").config(); // Charger les variables d'environnement depuis le fichier .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mariadb",
    logging: false,
  }
);

// Vérifier la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Synchroniser les modèles avec la base de données (créer les tables si elles n'existent pas)
sequelize
  .sync({ force: false }) // Mettez `force: true` pour supprimer et recréer les tables à chaque démarrage (utile en dev uniquement)
  .then(() => {
    console.log("Database synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

module.exports = sequelize;
