console.log("Loading Category");
const Category = require("./category.model");
console.log("Loading Subcategory");
const Subcategory = require("./subcategory.model");
console.log("Loading Video");
const Video = require("./video.model");
console.log("Loading Tutorial");
const Tutorial = require("./tutorial.model");

// Associations
Category.hasMany(Subcategory, { foreignKey: "category_id" });
Subcategory.belongsTo(Category, { foreignKey: "category_id" });

Category.hasMany(Video, { foreignKey: "category_id" });
Video.belongsTo(Category, { foreignKey: "category_id" });

Subcategory.hasMany(Video, { foreignKey: "subcategory_id" });
Video.belongsTo(Subcategory, { foreignKey: "subcategory_id" });

Video.hasOne(Tutorial, { foreignKey: "video_id" });
Tutorial.belongsTo(Video, { foreignKey: "video_id" });

module.exports = { Category, Subcategory, Video, Tutorial };
