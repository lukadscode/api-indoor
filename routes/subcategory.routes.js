const express = require("express");
const { body } = require("express-validator");
const SubcategoryController = require("../controllers/subcategory.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Valider les données de la sous-catégorie
const validateSubcategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("color")
    .isLength({ min: 7, max: 7 })
    .withMessage("Invalid color format"),
  body("categoryId").isInt().withMessage("Valid category ID is required"),
];

/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: Subcategory management
 */

/**
 * @swagger
 * /subcategories:
 *   get:
 *     summary: Retrieve a list of all subcategories
 *     tags: [Subcategories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subcategory'
 */
router.get("/", authMiddleware, SubcategoryController.getAllSubcategories);

/**
 * @swagger
 * /subcategories/{id}:
 *   get:
 *     summary: Retrieve a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subcategory ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The subcategory details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
 *       404:
 *         description: Subcategory not found
 */
router.get("/:id", authMiddleware, SubcategoryController.getSubcategoryById);

/**
 * @swagger
 * /subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subcategories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  authMiddleware,
  validateSubcategory,
  SubcategoryController.createSubcategory
);

/**
 * @swagger
 * /subcategories/{id}:
 *   put:
 *     summary: Update a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subcategory ID
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       404:
 *         description: Subcategory not found
 */
router.put(
  "/:id",
  authMiddleware,
  validateSubcategory,
  SubcategoryController.updateSubcategory
);

/**
 * @swagger
 * /subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subcategory ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Subcategory successfully deleted
 *       404:
 *         description: Subcategory not found
 */
router.delete("/:id", authMiddleware, SubcategoryController.deleteSubcategory);

module.exports = router;
