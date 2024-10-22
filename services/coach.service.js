const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Coach = require("../models/coach.model");
const EmailService = require("../services/email.service");

// Hachage du mot de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparaison des mots de passe
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Obtenir tous les coachs
exports.getAllCoaches = async () => {
  return await Coach.findAll();
};

// Obtenir un coach par email
exports.getCoachByEmail = async (email) => {
  return await Coach.findOne({ where: { email } });
};

exports.getCoachByIdffa = async (idffa) => {
  return await Coach.findOne({ where: { idffa } });
};

// Créer un nouveau coach
exports.createCoach = async (coachData) => {
  coachData.password_hash = await hashPassword(coachData.password); // Hachage du mot de passe avant sauvegarde
  return await Coach.create(coachData);
};

// Créer un nouveau coach avec envoi de l'email de bienvenue
exports.createCoach = async (coachData) => {
  const token = uuidv4(); // Générer un token pour l'email de bienvenue

  // Associer le token de bienvenue et l'expiration pour définir le mot de passe plus tard
  coachData.reset_password_token = token;
  // Expiration du token dans 48 heures (48 * 60 * 60 * 1000 millisecondes)
  coachData.reset_password_token_expires = new Date(
    Date.now() + 48 * 60 * 60 * 1000
  ); // Expire dans 48 heures

  const newCoach = await Coach.create(coachData);

  // Envoyer l'e-mail de bienvenue avec le token de réinitialisation
  await EmailService.sendWelcomeEmail(newCoach.email, token);

  return newCoach;
};

// Mise à jour du mot de passe d'un coach
exports.updatePassword = async (id, newPassword) => {
  const coach = await Coach.findByPk(id);
  if (!coach) {
    throw new Error("Coach not found");
  }
  coach.password_hash = await hashPassword(newPassword);
  await coach.save();
  return coach;
};

// Générer un token pour la réinitialisation du mot de passe
exports.generatePasswordResetToken = async (email) => {
  try {
    // Vérifie que l'email a bien été reçu
    console.log("Recherche du coach avec l'email:", email);

    const coach = await Coach.findOne({ where: { email } });
    if (!coach) {
      console.error("Coach non trouvé pour l'email:", email);
      throw new Error("Coach non trouvé");
    }

    // Générer un token unique
    const token = uuidv4();
    coach.reset_password_token = token;
    coach.reset_password_token_expires = new Date(Date.now() + 3600000); // Expire dans 1 heure

    // Sauvegarder le coach avec le token et l'expiration du token
    await coach.save();

    // Log pour vérifier le succès de la sauvegarde
    console.log("Token enregistré avec succès pour l'email:", email);

    return { token, email: coach.email };
  } catch (error) {
    console.error(
      "Erreur lors de la génération du token de réinitialisation:",
      error
    );
    throw new Error("Échec de la génération du token de réinitialisation");
  }
};

// Rechercher un coach par son token de réinitialisation
exports.findByResetToken = async (token) => {
  return await Coach.findOne({
    where: {
      reset_password_token: token,
      reset_password_token_expires: { [Op.gt]: new Date() }, // Vérifie que le token n'est pas expiré
    },
  });
};

// Supprimer un coach par ID
exports.deleteCoach = async (id) => {
  const coach = await Coach.findByPk(id);
  if (!coach) {
    throw new Error("Coach not found");
  }
  return await coach.destroy();
};

// Enregistrer la dernière connexion d'un coach
exports.recordLogin = async (coach) => {
  coach.last_login = new Date();
  await coach.save();
};

// Mise à jour du mot de passe avec un token
exports.updatePasswordWithToken = async (token, newPassword) => {
  try {
    // Log le token pour vérifier qu'il est bien passé
    console.log("Token pour mise à jour du mot de passe:", token);

    // Rechercher un coach qui possède ce token et dont la validité du token n'est pas expirée
    const coach = await Coach.findOne({
      where: {
        reset_password_token: token, // Assurez-vous que le token est correctement passé
        reset_password_token_expires: { [Op.gt]: new Date() }, // Le token doit être encore valide
      },
    });

    // Si aucun coach n'est trouvé, retourner une erreur
    if (!coach) {
      throw new Error("Token invalide ou expiré");
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe, et effacer le token
    coach.password_hash = hashedPassword;
    coach.reset_password_token = null;
    coach.reset_password_token_expires = null;

    // Sauvegarder les changements
    await coach.save();

    return coach;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du mot de passe avec le token :",
      error
    );
    throw new Error("Erreur lors de la mise à jour du mot de passe");
  }
};
