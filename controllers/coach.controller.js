const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const CoachService = require("../services/coach.service");
const EmailService = require("../services/email.service");

// Connexion d'un coach
exports.login = async (req, res) => {
  const { idffa, password } = req.body;
  try {
    // Log des informations de connexion
    console.log("Tentative de connexion avec ID FFA :", idffa);
    console.log("Mot de passe soumis :", password);

    // Rechercher le coach par ID FFA
    const coach = await CoachService.getCoachByIdffa(idffa);

    if (!coach) {
      console.error("Coach non trouvé pour l'ID FFA :", idffa);
      return res.status(404).json({ error: "Coach not found" });
    }

    // Log pour vérifier si le coach a été trouvé
    console.log("Coach trouvé :", coach);

    // Comparer le mot de passe soumis avec le mot de passe haché
    const isPasswordValid = await bcrypt.compare(password, coach.password_hash);

    // Si le mot de passe est incorrect
    if (!isPasswordValid) {
      console.error("Mot de passe invalide pour le coach :", idffa);
      return res.status(401).json({ error: "Invalid password" });
    }

    // Enregistrer la dernière connexion du coach
    await CoachService.recordLogin(coach);

    // Réponse de succès
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    // Log pour voir ce qui a échoué
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ error: "Failed to log in" });
  }
};

// Demande de réinitialisation de mot de passe
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Log pour vérifier l'email reçu
    console.log("Demande de réinitialisation pour l'email:", email);

    // Générer le token et obtenir l'e-mail du coach
    const { token } = await CoachService.generatePasswordResetToken(email);

    // Log pour vérifier si le token a été généré
    console.log("Token généré:", token);

    // Envoyer l'e-mail avec le token de réinitialisation
    await EmailService.sendResetPasswordEmail(email, token);

    res.status(200).json({
      success: true,
      message: "Un e-mail de réinitialisation a été envoyé",
    });
  } catch (err) {
    // Log de l'erreur réelle pour identifier le problème
    console.error(
      "Erreur lors de la génération du token de réinitialisation:",
      err
    );

    res
      .status(500)
      .json({ error: "Échec de la génération du token de réinitialisation" });
  }
};

// Réinitialisation du mot de passe
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Log pour vérifier si le token et le nouveau mot de passe sont reçus
    console.log("Reset Password Token:", token);
    console.log("New Password:", newPassword);

    // Rechercher le coach par le token
    const coach = await CoachService.findByResetToken(token);
    if (!coach) {
      console.error("Invalid or expired token"); // Ajout d'un log en cas d'erreur
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Mettre à jour le mot de passe avec le nouveau mot de passe
    await CoachService.updatePassword(coach.id, newPassword);

    // Réinitialisation réussie
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    // Log l'erreur pour obtenir plus d'informations sur ce qui échoue
    console.error("Erreur lors de la réinitialisation du mot de passe:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};

// Obtenir tous les coachs
exports.getAllCoaches = async (req, res) => {
  try {
    const coaches = await CoachService.getAllCoaches();
    res.status(200).json(coaches);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coaches" });
  }
};

// Obtenir un coach par ID
exports.getCoachById = async (req, res) => {
  try {
    const coach = await CoachService.getCoachById(req.params.id);
    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(200).json(coach);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coach" });
  }
};

// Créer un nouveau coach
exports.createCoach = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCoach = await CoachService.createCoach(req.body);
    res.status(201).json(newCoach);
  } catch (err) {
    res.status(500).json({ error: "Failed to create coach" });
  }
};

// Mettre à jour un coach
exports.updateCoach = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCoach = await CoachService.updateCoach(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedCoach);
  } catch (err) {
    if (err.message === "Coach not found") {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(500).json({ error: "Failed to update coach" });
  }
};

// Supprimer un coach
exports.deleteCoach = async (req, res) => {
  try {
    await CoachService.deleteCoach(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.message === "Coach not found") {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(500).json({ error: "Failed to delete coach" });
  }
};

// Créer un nouveau coach et envoyer un email de bienvenue
// Créer un nouveau coach et envoyer un email de bienvenue
exports.createCoach = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCoach = await CoachService.createCoach(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Coach créé avec succès, e-mail de bienvenue envoyé.",
      });
  } catch (err) {
    console.error("Erreur lors de la création du coach :", err);
    res.status(500).json({ error: "Échec de la création du coach." });
  }
};
