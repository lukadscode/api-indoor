const { validationResult } = require("express-validator");
const TutorialService = require("../services/tutorial.service");

// Obtenir tous les tutoriels
exports.getAllTutorials = async (req, res) => {
  try {
    const tutorials = await TutorialService.getAllTutorials();
    res.status(200).json(tutorials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tutorials" });
  }
};

// Obtenir un tutoriel par ID
exports.getTutorialById = async (req, res) => {
  try {
    const tutorial = await TutorialService.getTutorialById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.status(200).json(tutorial);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tutorial" });
  }
};

// Créer un nouveau tutoriel
exports.createTutorial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newTutorial = await TutorialService.createTutorial(req.body);
    res.status(201).json(newTutorial);
  } catch (err) {
    res.status(500).json({ error: "Failed to create tutorial" });
  }
};

// Mettre à jour un tutoriel
exports.updateTutorial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedTutorial = await TutorialService.updateTutorial(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedTutorial);
  } catch (err) {
    if (err.message === "Tutorial not found") {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.status(500).json({ error: "Failed to update tutorial" });
  }
};

// Supprimer un tutoriel
exports.deleteTutorial = async (req, res) => {
  try {
    await TutorialService.deleteTutorial(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.message === "Tutorial not found") {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.status(500).json({ error: "Failed to delete tutorial" });
  }
};
