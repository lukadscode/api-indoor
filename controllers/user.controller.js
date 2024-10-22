const { validationResult } = require("express-validator");
const UserService = require("../services/user.service");
const { generateToken } = require("../utils/jwt.util");

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Créer un nouvel utilisateur (inscription)
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Créer l'utilisateur
    const newUser = await UserService.createUser(req.body);

    // Générer un token JWT après création
    const token = generateToken({ userId: newUser.id, role: newUser.role });

    // Renvoyer l'utilisateur créé avec le token
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Mettre à jour un utilisateur par ID
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Supprimer un utilisateur par ID
exports.deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Connexion de l'utilisateur (login)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await UserService.getUserByEmail(email);
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Générer un token JWT après connexion réussie
    const token = generateToken({ userId: user.id, role: user.role });

    // Renvoyer le token JWT et les informations de l'utilisateur
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
