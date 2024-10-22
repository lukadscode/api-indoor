const { validationResult } = require("express-validator");
const SubcategoryService = require("../services/subcategory.service");

// Obtenir toutes les sous-catégories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await SubcategoryService.getAllSubcategories();
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

// Obtenir une sous-catégorie par ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await SubcategoryService.getSubcategoryById(
      req.params.id
    );
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.status(200).json(subcategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subcategory" });
  }
};

// Créer une nouvelle sous-catégorie
exports.createSubcategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newSubcategory = await SubcategoryService.createSubcategory(req.body);
    res.status(201).json(newSubcategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to create subcategory" });
  }
};

// Mettre à jour une sous-catégorie
exports.updateSubcategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedSubcategory = await SubcategoryService.updateSubcategory(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedSubcategory);
  } catch (err) {
    if (err.message === "Subcategory not found") {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.status(500).json({ error: "Failed to update subcategory" });
  }
};

// Supprimer une sous-catégorie
exports.deleteSubcategory = async (req, res) => {
  try {
    await SubcategoryService.deleteSubcategory(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.message === "Subcategory not found") {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
};
