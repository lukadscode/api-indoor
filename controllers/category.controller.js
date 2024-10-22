const { validationResult } = require("express-validator");
const CategoryService = require("../services/category.service");

// Obtenir toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Obtenir une catégorie par ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
  // Valider les erreurs provenant des middlewares
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCategory = await CategoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCategory = await CategoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    if (err.message === "Category not found") {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {
    await CategoryService.deleteCategory(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.message === "Category not found") {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(500).json({ error: "Failed to delete category" });
  }
};

// Contrôleur pour récupérer les catégories et sous-catégories
exports.getCategoriesWithSubcategories = async (req, res) => {
  console.log("Requête reçue sur /categories-with-subcategories"); // Log pour indiquer que la requête est arrivée
  try {
    console.log(
      "Appel au service pour récupérer les catégories avec sous-catégories..."
    );
    const formattedCategories =
      await CategoryService.getCategoriesWithSubcategories();
    console.log("Catégories récupérées avec succès :", formattedCategories);
    res.status(200).json(formattedCategories);
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories :", err);
    res.status(500).json({ error: err.message });
  }
};
