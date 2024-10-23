console.log("Loading Category");
const Category = require("./category.model");
console.log("Loading Subcategory");
const Subcategory = require("./subcategory.model");
console.log("Loading Video");
const Video = require("./video.model");
console.log("Loading Tutorial");
const Tutorial = require("./tutorial.model");

// Associations
Category.hasMany(Subcategory, {
  foreignKey: "category_id",
  as: "subcategories", // Alias pour les sous-catégories
});
Subcategory.belongsTo(Category, { foreignKey: "category_id" });

Category.hasMany(Video, {
  foreignKey: "category_id",
  as: "categoryVideos", // Alias pour les vidéos associées à une catégorie
});
Video.belongsTo(Category, { foreignKey: "category_id" });

Subcategory.hasMany(Video, {
  foreignKey: "subcategory_id",
  as: "subcategoryVideos", // Alias pour les vidéos associées à une sous-catégorie
});
Video.belongsTo(Subcategory, {
  foreignKey: "subcategory_id",
  as: "subcategoryVideos", // Alias correspondant pour la relation inverse
});

Video.hasOne(Tutorial, { foreignKey: "video_id", as: "tutorial" });
Tutorial.belongsTo(Video, { foreignKey: "video_id", as: "tutorial" });

module.exports = { Category, Subcategory, Video, Tutorial };
