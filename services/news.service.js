const News = require("../models/news.model");

// Obtenir toutes les actualités
exports.getAllNews = async () => {
  return await News.findAll();
};

// Obtenir une actualité par ID
exports.getNewsById = async (id) => {
  return await News.findByPk(id);
};

// Créer une nouvelle actualité
exports.createNews = async (newsData) => {
  return await News.create(newsData);
};

// Mettre à jour une actualité par ID
exports.updateNews = async (id, newsData) => {
  const news = await News.findByPk(id);
  if (!news) {
    throw new Error("News not found");
  }
  return await news.update(newsData);
};

// Supprimer une actualité par ID
exports.deleteNews = async (id) => {
  const news = await News.findByPk(id);
  if (!news) {
    throw new Error("News not found");
  }
  return await news.destroy();
};
