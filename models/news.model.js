const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["link", "video"]],
      },
    },
    linkUrl: {
      type: DataTypes.STRING,
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "news",
    timestamps: false,
  }
);

module.exports = News;
