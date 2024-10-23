const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
      type: DataTypes.STRING(7),
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;
