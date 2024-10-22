const express = require("express");
const { body } = require("express-validator");
const CategoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Valider les données de la catégorie
const validateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("color")
    .isLength({ min: 7, max: 7 })
    .withMessage("Invalid color format"),
];

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of all categories
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", authMiddleware, CategoryController.getAllCategories);

/**
 * @swagger
 *  /categories/categories-with-subcategories:
 *   get:
 *     summary: Retrieve a list of all categories with subcategories
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all categories with subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get(
  "/categories-with-subcategories",
  (req, res, next) => {
    console.log("Route /categories-with-subcategories appelée");
    next(); // Continuer vers le contrôleur après avoir loggé
  },
  authMiddleware,
  CategoryController.getCategoriesWithSubcategories
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get("/:id", authMiddleware, CategoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  authMiddleware,
  validateCategory,
  CategoryController.createCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put(
  "/:id",
  authMiddleware,
  validateCategory,
  CategoryController.updateCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Category successfully deleted
 *       404:
 *         description: Category not found
 */
router.delete("/:id", authMiddleware, CategoryController.deleteCategory);

module.exports = router;
