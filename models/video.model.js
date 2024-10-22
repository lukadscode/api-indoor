/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - video_code
 *         - title
 *         - video_url
 *         - download_url
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the video
 *         video_code:
 *           type: string
 *           description: Unique code representing the video
 *           example: VID123456
 *         title:
 *           type: string
 *           description: The title of the video
 *           example: Introduction to JavaScript
 *         video_url:
 *           type: string
 *           description: URL of the video
 *           example: https://example.com/videos/javascript-intro
 *         download_url:
 *           type: string
 *           description: URL for downloading the video content
 *           example: https://example.com/downloads/video.zip
 *         pdf_url:
 *           type: string
 *           description: URL of the associated PDF, if any
 *           example: https://example.com/pdf/javascript-guide.pdf
 *         subcategory_id:
 *           type: integer
 *           description: The ID of the related subcategory
 *           nullable: true
 *         category_id:
 *           type: integer
 *           description: The ID of the related category
 *           nullable: true
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Subcategory = require("./subcategory.model");
const Category = require("./category.model");

const Video = sequelize.define(
  "Video",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    video_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    download_url: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming this is a required field
    },
    pdf_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Subcategory,
        key: "id",
      },
      onDelete: "SET NULL",
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "SET NULL",
      allowNull: true,
    },
  },
  {
    tableName: "videos",
    timestamps: false,
  }
);

Video.belongsTo(Subcategory, { foreignKey: "subcategory_id" });
Video.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Video;
