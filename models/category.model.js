/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - color
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *           example: Programming
 *         color:
 *           type: string
 *           description: The hexadecimal color code for the category
 *           example: #FF5733
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(7), // Code couleur hexadécimal
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: false, // Pas de colonnes createdAt et updatedAt
  }
);

module.exports = Category;
