const Category = require("./models/category.model");
const Subcategory = require("./models/subcategory.model");
const Video = require("./models/video.model");
const Tutorial = require("./models/tutorial.model");

// Association entre Category et Subcategory
Category.hasMany(Subcategory, {
  as: "subcategories",
  foreignKey: "category_id",
});
Subcategory.belongsTo(Category, { foreignKey: "category_id" });

// Association entre Category et Video
Category.hasMany(Video, { as: "categoryVideos", foreignKey: "category_id" });
Video.belongsTo(Category, { foreignKey: "category_id" });

// Association entre Subcategory et Video
Subcategory.hasMany(Video, {
  as: "subcategoryVideos",
  foreignKey: "subcategory_id",
});
Video.belongsTo(Subcategory, { foreignKey: "subcategory_id" });

// Association entre Video et Tutorial
Video.hasOne(Tutorial, { as: "tutorial", foreignKey: "video_id" });
Tutorial.belongsTo(Video, { foreignKey: "video_id" });

module.exports = {
  Category,
  Subcategory,
  Video,
  Tutorial,
};
