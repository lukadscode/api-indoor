const express = require("express");
const { body } = require("express-validator");
const NewsController = require("../controllers/news.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Validation des données de l'actualité
const validateNews = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type")
    .isIn(["link", "video"])
    .withMessage('Type must be either "link" or "video"'),
];

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Retrieve a list of all news
 *     tags: [News]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all news
 */
router.get("/", NewsController.getAllNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Retrieve news by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The news ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The news details
 *       404:
 *         description: News not found
 */
router.get("/:id", authMiddleware, NewsController.getNewsById);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a new news item
 *     tags: [News]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: News created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, validateNews, NewsController.createNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update news by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The news ID
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: News updated successfully
 *       404:
 *         description: News not found
 */
router.put("/:id", authMiddleware, validateNews, NewsController.updateNews);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete news by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The news ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: News successfully deleted
 *       404:
 *         description: News not found
 */
router.delete("/:id", authMiddleware, NewsController.deleteNews);

module.exports = router;
