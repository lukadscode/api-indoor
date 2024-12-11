const express = require("express");
const { body } = require("express-validator");
const CoachController = require("../controllers/coach.controller");
const CoachService = require("../services/coach.service");

const router = express.Router();

// Validation des données du coach pour la création
const validateCoach = [
  body("idffa").notEmpty().withMessage("ID FFA is required"),
  body("email").isEmail().withMessage("A valid email is required"),
  body("access")
    .isIn(["AviFit", "RoWning", "AviFit/RoWning", "e-row", "tout"])
    .withMessage(
      "Access must be one of 'AviFit', 'RoWning', 'AviFit/RoWning', 'e-row', or 'tout'"
    ),
];

/**
 * @swagger
 * /coaches:
 *   get:
 *     summary: Retrieve a list of all coaches
 *     tags: [Coaches]
 *     responses:
 *       200:
 *         description: List of all coaches
 */
router.get("/", CoachController.getAllCoaches);

/**
 * @swagger
 * /coaches/login:
 *   post:
 *     summary: Coach login
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idffa:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid password
 *       404:
 *         description: Coach not found
 */
router.post("/login", CoachController.login);

/**
 * @swagger
 * /coaches/reset-password/request:
 *   post:
 *     summary: Request password reset
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset token generated
 *       404:
 *         description: Coach not found
 */
router.post("/reset-password/request", CoachController.requestPasswordReset);

/**
 * @swagger
 * /coaches/reset-password:
 *   post:
 *     summary: Reset coach password
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post("/reset-password", CoachController.resetPassword);

/**
 * @swagger
 * /coaches/set-password:
 *   post:
 *     summary: Définir le mot de passe du coach avec un token
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mot de passe défini avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Password set successfully"
 *       400:
 *         description: Token invalide ou expiré
 *       500:
 *         description: Erreur lors de la définition du mot de passe
 */
router.post("/set-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    await CoachService.updatePasswordWithToken(token, newPassword);
    res
      .status(200)
      .json({ success: true, message: "Password set successfully" });
  } catch (err) {
    console.error("Erreur lors de la définition du mot de passe :", err);
    res.status(500).json({ error: "Failed to set password" });
  }
});

/**
 * @swagger
 * /coaches:
 *   post:
 *     summary: Create a new coach
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idffa:
 *                 type: string
 *                 description: Identifiant FFA du coach
 *                 example: "123456"
 *               email:
 *                 type: string
 *                 description: Adresse e-mail du coach
 *                 example: "coach@example.com"
 *               access:
 *                 type: string
 *                 description: Niveau d'accès du coach
 *                 enum: ["AviFit", "RoWning", "AviFit/RoWning", "e-row", "tout"]
 *                 example: "AviFit"
 *     responses:
 *       201:
 *         description: Coach créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 idffa:
 *                   type: string
 *                   example: "123456"
 *                 email:
 *                   type: string
 *                   example: "coach@example.com"
 *                 access:
 *                   type: string
 *                   example: "AviFit"
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */
router.post("/", validateCoach, CoachController.createCoach);

module.exports = router;
