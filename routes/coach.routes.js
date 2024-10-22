const express = require("express");
const { body } = require("express-validator");
const CoachController = require("../controllers/coach.controller");
const CoachService = require("../services/coach.service");

const router = express.Router();

// Validation des données du coach pour la création
const validateCoach = [
  body("idffa").notEmpty().withMessage("ID FFA is required"),
  body("email").isEmail().withMessage("A valid email is required"),
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
 *     summary: Créer un nouveau coach
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
 *                 example: 123456
 *               email:
 *                 type: string
 *                 description: Adresse e-mail du coach
 *                 example: coach@example.com
 *     responses:
 *       201:
 *         description: Coach créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Coach créé avec succès, e-mail de bienvenue envoyé."
 *       400:
 *         description: Mauvaise requête, vérifiez les données envoyées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Échec de la création du coach"
 */
router.post("/", validateCoach, CoachController.createCoach);

module.exports = router;
