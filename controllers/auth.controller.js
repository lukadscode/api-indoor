const { generateToken } = require("../utils/jwt.util");
const UserService = require("../services/user.service");

// Controller pour gérer la connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await UserService.getUserByEmail(email);
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Générer un token JWT avec les informations de l'utilisateur
    const token = generateToken({ userId: user.id, role: user.role });

    // Envoyer le token au client
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
