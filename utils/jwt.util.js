const jwt = require("jsonwebtoken");

// Fonction pour générer un token JWT
const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Fonction pour vérifier un token JWT
const verifyToken = (token) => {
  try {
    // Log pour vérifier si la fonction est appelée et quel token est reçu
    console.log("Vérification du token :", token);

    // Vérifie le token et renvoie les données décodées (payload)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log pour voir le payload décodé
    console.log("Token vérifié, payload décodé :", decoded);

    return decoded;
  } catch (err) {
    // Si le token est invalide ou expiré, log l'erreur
    console.error("Erreur de vérification du token :", err.message);
    return null;
  }
};

// Fonction pour décoder un token JWT sans vérifier la signature
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
