const Subcategory = require("../models/subcategory.model");

// Service pour obtenir toutes les sous-catégories
exports.getAllSubcategories = async () => {
  return await Subcategory.findAll({
    include: "Category", // Inclure les informations sur la catégorie associée
  });
};

// Service pour obtenir une sous-catégorie par ID
exports.getSubcategoryById = async (id) => {
  return await Subcategory.findByPk(id, {
    include: "Category",
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
