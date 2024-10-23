const Subcategory = require("../models/subcategory.model");
const Video = require("../models/video.model");
const Category = require("../models/category.model");

// Service pour obtenir toutes les sous-catégories avec leurs vidéos et catégories associées
exports.getAllSubcategories = async () => {
  return await Subcategory.findAll({
    include: [
      {
        model: Video,
        as: "subcategoryVideos", // Utilisation de l'alias ici
      },
      {
        model: Category, // Inclure aussi la catégorie associée
      },
    ],
  });
};

// Service pour obtenir une sous-catégorie par ID avec ses vidéos et sa catégorie
exports.getSubcategoryById = async (id) => {
  return await Subcategory.findByPk(id, {
    include: [
      {
        model: Video,
        as: "subcategoryVideos", // Utilisation de l'alias ici
      },
      {
        model: Category, // Inclure aussi la catégorie associée
      },
    ],
  });
};

// Service pour créer une nouvelle sous-catégorie
exports.createSubcategory = async (subcategoryData) => {
  return await Subcategory.create(subcategoryData);
};

// Service pour mettre à jour une sous-catégorie par ID
exports.updateSubcategory = async (id, subcategoryData) => {
  const subcategory = await Subcategory.findByPk(id);
  if (!subcategory) {
    throw new Error("Subcategory not found");
  }
  return await subcategory.update(subcategoryData);
};

// Service pour supprimer une sous-catégorie par ID
exports.deleteSubcategory = async (id) => {
  const subcategory = await Subcategory.findByPk(id);
  if (!subcategory) {
    throw new Error("Subcategory not found");
  }
  return await subcategory.destroy();
};
