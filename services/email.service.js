const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.ffaviron.fr", // Le serveur SMTP que tu utilises
  port: 587, // Port SMTP pour STARTTLS
  secure: false, // false pour STARTTLS (true pour SMTPS)
  auth: {
    user: process.env.EMAIL_USER, // L'email expéditeur (utilisateur SMTP)
    pass: process.env.EMAIL_PASS, // Le mot de passe SMTP (masque-le ici)
  },
  tls: {
    rejectUnauthorized: false, // Si tu utilises un certificat auto-signé ou des erreurs de certificat, tu peux mettre à false
  },
});

exports.sendResetPasswordEmail = async (email, token) => {
  const resetLink = `https://yourdomain.com/reset-password?token=${token}`; // URL du lien de réinitialisation

  const mailOptions = {
    from: process.env.EMAIL_USER, // Expéditeur
    to: email, // Destinataire
    subject: "Réinitialisation de votre mot de passe",
    text: `Bonjour,\n\nVeuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :\n${resetLink}\n\nSi vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de réinitialisation envoyé avec succès à", email);
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'e-mail de réinitialisation:",
      error
    );
    throw new Error("Erreur lors de l'envoi de l'e-mail de réinitialisation");
  }
};

// Envoyer un email de bienvenue avec un lien pour définir un mot de passe
exports.sendWelcomeEmail = async (email, token) => {
  const setPasswordLink = `https://yourdomain.com/set-password?token=${token}`; // URL du lien pour définir le mot de passe

  const mailOptions = {
    from: process.env.EMAIL_USER, // Expéditeur
    to: email, // Destinataire
    subject: "Bienvenue ! Définissez votre mot de passe",
    text: `Bonjour,\n\nBienvenue dans notre service. Veuillez cliquer sur le lien suivant pour définir votre mot de passe :\n${setPasswordLink}\n\nCe lien est valable 48 heures.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de bienvenue envoyé avec succès à", email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail de bienvenue:", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail de bienvenue");
  }
};
