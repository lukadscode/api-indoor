const Tutorial = require("../models/tutorial.model");

// Service pour obtenir tous les tutoriels
exports.getAllTutorials = async () => {
  return await Tutorial.findAll({
    include: "Video", // Inclure les informations sur la vidéo associée
  });
};

// Service pour obtenir un tutoriel par ID
exports.getTutorialById = async (id) => {
  return await Tutorial.findByPk(id, {
    include: "Video",
  });
};

// Service pour créer un nouveau tutoriel
exports.createTutorial = async (tutorialData) => {
  return await Tutorial.create(tutorialData);
};

// Service pour mettre à jour un tutoriel par ID
exports.updateTutorial = async (id, tutorialData) => {
  const tutorial = await Tutorial.findByPk(id);
  if (!tutorial) {
    throw new Error("Tutorial not found");
  }
  return await tutorial.update(tutorialData);
};

// Service pour supprimer un tutoriel par ID
exports.deleteTutorial = async (id) => {
  const tutorial = await Tutorial.findByPk(id);
  if (!tutorial) {
    throw new Error("Tutorial not found");
  }
  return await tutorial.destroy();
};
