/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password_hash
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         email:
 *           type: string
 *           description: The user's email address
 *           example: user@example.com
 *         password_hash:
 *           type: string
 *           description: The hashed password of the user
 *           example: $2a$10$E8dE1hlOW2CvnlP/mf
 *         first_name:
 *           type: string
 *           description: The user's first name
 *           example: John
 *         last_name:
 *           type: string
 *           description: The user's last name
 *           example: Doe
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: The role of the user
 *           default: user
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date when the user was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date when the user was last updated
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    created_at: {
      // Nom personnalisé de la colonne
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      // Nom personnalisé de la colonne
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    createdAt: "created_at", // Définir le nom personnalisé pour Sequelize
    updatedAt: "updated_at", // Définir le nom personnalisé pour Sequelize
  }
);

// Méthode pour vérifier si le mot de passe est valide
User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;
