const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Coach = sequelize.define(
  "Coach",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idffa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email doit être unique
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE, // Stocke la dernière connexion
    },
    reset_password_token: {
      type: DataTypes.STRING, // Token pour la réinitialisation du mot de passe
    },
    reset_password_token_expires: {
      type: DataTypes.DATE, // Expiration du token
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "tout",
      validate: {
        isIn: [["AviFit", "RoWning", "AviFit/RoWning", "e-row", "tout"]],
      },
    },
  },
  {
    tableName: "coach",
    timestamps: false,
  }
);

module.exports = Coach;
