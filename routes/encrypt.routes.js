const express = require("express");
const crypto = require("crypto");
const router = express.Router();

/**
 * @swagger
 * /encrypt:
 *   post:
 *     summary: Encrypt a password
 *     description: Encrypt a password using AES-256-CBC encryption compatible with OpenSSL.
 *     tags:
 *       - Encryption
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "mySuperSecretPassword"
 *               passphrase:
 *                 type: string
 *                 example: "myPassphrase"
 *     responses:
 *       200:
 *         description: Encryption successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 encrypted:
 *                   type: string
 *                   example: "a8b7c6d5e4f3..."
 *                 iv:
 *                   type: string
 *                   example: "1a2b3c4d5e6f..."
 */
router.post("/encrypt", (req, res) => {
  const { password, passphrase } = req.body;

  if (!password || !passphrase) {
    return res
      .status(400)
      .json({ error: "Password and passphrase are required" });
  }

  // Générer une clé à partir de la passphrase en utilisant un hash (SHA256)
  const key = crypto.createHash("sha256").update(passphrase).digest(); // Génère une clé AES-256

  // Générer un vecteur d'initialisation (IV)
  const iv = crypto.randomBytes(16); // OpenSSL AES-256-CBC nécessite un IV de 16 octets

  // Utiliser AES en mode CBC (Cipher Block Chaining)
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Retourner le mot de passe chiffré et l'IV
  res.json({
    encrypted,
    iv: iv.toString("hex"), // Retourner l'IV pour le déchiffrement ultérieur
  });
});

module.exports = router;
