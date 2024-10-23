const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Tutorial = sequelize.define(
  "Tutorial",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tutorial_code: {
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
      allowNull: false,
    },
    pdf_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tutorials",
    timestamps: false,
  }
);

module.exports = Tutorial;
