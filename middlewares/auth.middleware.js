const { verifyToken } = require("../utils/jwt.util");

const authMiddleware = (req, res, next) => {
  // Récupérer le token JWT dans l'en-tête Authorization
  const authHeader = req.header("Authorization");

  console.log("Authorization Header reçu :", authHeader); // Log du header Authorization

  if (!authHeader) {
    console.log("Aucun en-tête Authorization fourni");
    return res
      .status(401)
      .json({ error: "Access denied. No Authorization header provided." });
  }

  // Vérifier si le token commence bien par "Bearer "
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    console.log("Aucun token fourni ou format incorrect");
    return res
      .status(401)
      .json({ error: "Access denied. No token provided or incorrect format." });
  }

  // Vérifier la validité du token
  const decoded = verifyToken(token);

  console.log("Token décodé :", decoded); // Log pour voir si le token est bien décodé

  if (!decoded) {
    console.log("Token invalide");
    return res.status(400).json({ error: "Invalid token" });
  }

  // Ajouter les informations décodées (userId, role) à l'objet req
  req.user = decoded;

  console.log("Utilisateur ajouté à req.user :", req.user); // Log du contenu de req.user

  // Passer au middleware suivant ou à la route
  next();
};

module.exports = authMiddleware;
