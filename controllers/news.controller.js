const { validationResult } = require("express-validator");
const NewsService = require("../services/news.service");

// Obtenir toutes les actualités
exports.getAllNews = async (req, res) => {
  try {
    const news = await NewsService.getAllNews();
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// Obtenir une actualité par ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await NewsService.getNewsById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// Créer une nouvelle actualité
exports.createNews = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newNews = await NewsService.createNews(req.body);
    res.status(201).json(newNews);
  } catch (err) {
    res.status(500).json({ error: "Failed to create news" });
  }
};

// Mettre à jour une actualité par ID
exports.updateNews = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedNews = await NewsService.updateNews(req.params.id, req.body);
    res.status(200).json(updatedNews);
  } catch (err) {
    if (err.message === "News not found") {
      return res.status(404).json({ error: "News not found" });
    }
    res.status(500).json({ error: "Failed to update news" });
  }
};

// Supprimer une actualité
exports.deleteNews = async (req, res) => {
  try {
    await NewsService.deleteNews(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.message === "News not found") {
      return res.status(404).json({ error: "News not found" });
    }
    res.status(500).json({ error: "Failed to delete news" });
  }
};
