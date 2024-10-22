const express = require("express");
const { body } = require("express-validator");
const TutorialController = require("../controllers/tutorial.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Valider les données du tutoriel
const validateTutorial = [
  body("tutorialCode").notEmpty().withMessage("Tutorial code is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("videoUrl").notEmpty().withMessage("Video URL is required"),
  body("videoId").isInt().withMessage("Valid video ID is required"),
];

/**
 * @swagger
 * tags:
 *   name: Tutorials
 *   description: Tutorial management
 */

/**
 * @swagger
 * /tutorials:
 *   get:
 *     summary: Retrieve a list of all tutorials
 *     tags: [Tutorials]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tutorials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tutorial'
 */
router.get("/", TutorialController.getAllTutorials);

/**
 * @swagger
 * /tutorials/{id}:
 *   get:
 *     summary: Retrieve a tutorial by ID
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tutorial ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The tutorial details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tutorial'
 *       404:
 *         description: Tutorial not found
 */
router.get("/:id", authMiddleware, TutorialController.getTutorialById);

/**
 * @swagger
 * /tutorials:
 *   post:
 *     summary: Create a new tutorial
 *     tags: [Tutorials]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutorial'
 *     responses:
 *       201:
 *         description: Tutorial created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  authMiddleware,
  validateTutorial,
  TutorialController.createTutorial
);

/**
 * @swagger
 * /tutorials/{id}:
 *   put:
 *     summary: Update a tutorial by ID
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tutorial ID
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutorial'
 *     responses:
 *       200:
 *         description: Tutorial updated successfully
 *       404:
 *         description: Tutorial not found
 */
router.put(
  "/:id",
  authMiddleware,
  validateTutorial,
  TutorialController.updateTutorial
);

/**
 * @swagger
 * /tutorials/{id}:
 *   delete:
 *     summary: Delete a tutorial by ID
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tutorial ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Tutorial successfully deleted
 *       404:
 *         description: Tutorial not found
 */
router.delete("/:id", authMiddleware, TutorialController.deleteTutorial);

module.exports = router;
