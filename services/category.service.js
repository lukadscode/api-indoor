const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.model");

// Service pour obtenir toutes les catégories
exports.getAllCategories = async () => {
  return await Category.findAll();
};

// Service pour obtenir une catégorie par ID
exports.getCategoryById = async (id) => {
  return await Category.findByPk(id);
};

// Service pour créer une nouvelle catégorie
exports.createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

// Service pour mettre à jour une catégorie par ID
exports.updateCategory = async (id, categoryData) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return await category.update(categoryData);
};

// Service pour supprimer une catégorie par ID
exports.deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return await category.destroy();
};

// Service pour récupérer les catégories avec leurs sous-catégories
exports.getCategoriesWithSubcategories = async () => {
  try {
    console.log(
      "Appel à la base de données pour récupérer les catégories avec sous-catégories..."
    );

    // Récupérer les catégories avec leurs sous-catégories
    const categories = await Category.findAll({
      include: [
        {
          model: Subcategory, // Inclure les sous-catégories
          as: "subcategories", // Assure-toi que l'association est bien définie
        },
      ],
    });

    // Log après la récupération des catégories
    console.log("Catégories récupérées :", categories);

    // Reformater les données pour inclure les sous-catégories
    const formattedCategories = categories.map((category) => ({
      id: category.id.toString(), // Convertir en chaîne de caractères si nécessaire
      name: category.name,
      color: category.color,
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id.toString(),
        name: subcategory.name,
        color: subcategory.color,
      })),
    }));

    // Log après le reformatage des catégories
    console.log("Catégories formatées :", formattedCategories);

    return formattedCategories; // Retourne les données formatées
  } catch (err) {
    // Log en cas d'erreur
    console.error(
      "Erreur lors de la récupération des catégories avec sous-catégories :",
      err
    );
    throw new Error("Erreur lors de la récupération des catégories"); // Propager l'erreur pour la gérer dans le contrôleur
  }
};
