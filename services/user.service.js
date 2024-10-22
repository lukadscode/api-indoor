const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Service pour obtenir tous les utilisateurs
exports.getAllUsers = async () => {
  return await User.findAll();
};

// Service pour obtenir un utilisateur par ID
exports.getUserById = async (id) => {
  return await User.findByPk(id);
};

// Service pour obtenir un utilisateur par email (utile pour l'authentification)
exports.getUserByEmail = async (email) => {
  console.log("Searching user by email:", email);
  const user = await User.findOne({ where: { email } });

  if (!user) {
    console.log("No user found with email:", email);
  } else {
    console.log("User found:", user);
  }

  return user;
};

// Service pour créer un nouvel utilisateur
exports.createUser = async (userData) => {
  const { password, ...otherData } = userData;
  const passwordHash = await bcrypt.hash(password, 10);
  return await User.create({ ...otherData, passwordHash });
};

// Service pour mettre à jour un utilisateur par ID
exports.updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  if (userData.password) {
    userData.passwordHash = await bcrypt.hash(userData.password, 10);
    delete userData.password; // Supprimer le mot de passe en clair
  }

  return await user.update(userData);
};

// Service pour supprimer un utilisateur par ID
exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return await user.destroy();
};
