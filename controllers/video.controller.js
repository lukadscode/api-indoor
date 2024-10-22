const { validationResult } = require("express-validator");
const VideoService = require("../services/video.service");

// Obtenir toutes les vidéos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await VideoService.getAllVideos();
    res.status(200).json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err); // Log d'erreur
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// Obtenir une vidéo par ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await VideoService.getVideoById(req.params.id);
    if (!video) {
      console.warn(`Video with ID ${req.params.id} not found`); // Log d'avertissement
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(200).json(video);
  } catch (err) {
    console.error(`Error fetching video with ID ${req.params.id}:`, err); // Log d'erreur
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

// Créer une nouvelle vidéo
exports.createVideo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("Validation errors:", errors.array()); // Log de validation des erreurs
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newVideo = await VideoService.createVideo(req.body);
    console.log("New video created:", newVideo); // Log de création réussie
    res.status(201).json(newVideo);
  } catch (err) {
    console.error("Error creating video:", err); // Log d'erreur
    res.status(500).json({ error: "Failed to create video" });
  }
};

// Mettre à jour une vidéo
exports.updateVideo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("Validation errors:", errors.array()); // Log de validation des erreurs
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedVideo = await VideoService.updateVideo(
      req.params.id,
      req.body
    );
    console.log("Video updated:", updatedVideo); // Log de mise à jour réussie
    res.status(200).json(updatedVideo);
  } catch (err) {
    if (err.message === "Video not found") {
      console.warn(`Video with ID ${req.params.id} not found for update`); // Log d'avertissement
      return res.status(404).json({ error: "Video not found" });
    }
    console.error(`Error updating video with ID ${req.params.id}:`, err); // Log d'erreur
    res.status(500).json({ error: "Failed to update video" });
  }
};

// Supprimer une vidéo
exports.deleteVideo = async (req, res) => {
  try {
    await VideoService.deleteVideo(req.params.id);
    console.log(`Video with ID ${req.params.id} deleted`); // Log de suppression réussie
    res.status(204).send(); // No Content
  } catch (err) {
    if (err.message === "Video not found") {
      console.warn(`Video with ID ${req.params.id} not found for deletion`); // Log d'avertissement
      return res.status(404).json({ error: "Video not found" });
    }
    console.error(`Error deleting video with ID ${req.params.id}:`, err); // Log d'erreur
    res.status(500).json({ error: "Failed to delete video" });
  }
};

// Contrôleur pour récupérer les vidéos par sous-catégorie ou catégorie
exports.fetchVideosBySubcategoryOrCategory = async (req, res) => {
  try {
    // Appeler le service pour récupérer les vidéos par sous-catégorie ou catégorie
    const result = await VideoService.getVideosBySubcategoryOrCategory();

    // Retourner les données au format attendu
    res.status(200).json(result);
  } catch (err) {
    console.error("Erreur lors de la récupération des vidéos :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des vidéos" });
  }
};
