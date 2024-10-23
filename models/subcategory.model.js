const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategory:
 *       type: object
 *       required:
 *         - name
 *         - color
 *         - category_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the subcategory
 *         name:
 *           type: string
 *           description: The name of the subcategory
 *           example: JavaScript Basics
 *         color:
 *           type: string
 *           description: The hexadecimal color code for the subcategory
 *           example: #3498db
 *         category_id:
 *           type: integer
 *           description: The ID of the parent category
 *           example: 1
 */
const Subcategory = sequelize.define(
  "Subcategory",
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
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "subcategories",
    timestamps: false,
  }
);

module.exports = Subcategory;
