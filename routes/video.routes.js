const express = require("express");
const { body } = require("express-validator");
const VideoController = require("../controllers/video.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Valider les données de la vidéo
const validateVideo = [
  body("videoCode").notEmpty().withMessage("Video code is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("videoUrl").notEmpty().withMessage("Video URL is required"),
  body("subcategoryId")
    .optional()
    .isInt()
    .withMessage("Valid subcategory ID is required"),
  body("categoryId")
    .optional()
    .isInt()
    .withMessage("Valid category ID is required"),
];

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management
 */

/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Retrieve a list of all videos
 *     tags: [Videos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 */
router.get("/", VideoController.getAllVideos);

/**
 * @swagger
 * /videos/bySubcategoryOrCategory:
 *   get:
 *     summary: Get videos by subcategory or category
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: List of videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       500:
 *         description: Server error
 */
router.get(
  "/bySubcategoryOrCategory",
  authMiddleware,
  VideoController.fetchVideosBySubcategoryOrCategory
);

/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Retrieve a video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The video details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: Video not found
 */
router.get("/:id", authMiddleware, VideoController.getVideoById);

/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       201:
 *         description: Video created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, validateVideo, VideoController.createVideo);

/**
 * @swagger
 * /videos/{id}:
 *   put:
 *     summary: Update a video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       404:
 *         description: Video not found
 */
router.put("/:id", authMiddleware, validateVideo, VideoController.updateVideo);

/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete a video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The video ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Video successfully deleted
 *       404:
 *         description: Video not found
 */
router.delete("/:id", authMiddleware, VideoController.deleteVideo);

module.exports = router;
