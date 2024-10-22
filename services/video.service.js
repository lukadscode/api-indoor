const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.model");
const Video = require("../models/video.model");
const Tutorial = require("../models/tutorial.model");

// Service pour obtenir toutes les vidéos
exports.getAllVideos = async () => {
  return await Video.findAll({
    include: ["Subcategory", "Category"], // Inclure les sous-catégories et catégories associées
  });
};

// Service pour obtenir une vidéo par ID
exports.getVideoById = async (id) => {
  return await Video.findByPk(id, {
    include: ["Subcategory", "Category"],
  });
};

// Service pour créer une nouvelle vidéo
exports.createVideo = async (videoData) => {
  return await Video.create(videoData);
};

// Service pour mettre à jour une vidéo par ID
exports.updateVideo = async (id, videoData) => {
  const video = await Video.findByPk(id);
  if (!video) {
    throw new Error("Video not found");
  }
  return await video.update(videoData);
};

// Service pour supprimer une vidéo par ID
exports.deleteVideo = async (id) => {
  const video = await Video.findByPk(id);
  if (!video) {
    throw new Error("Video not found");
  }
  return await video.destroy();
};

exports.getVideosBySubcategoryOrCategory = async () => {
  try {
    // Récupérer toutes les catégories avec sous-catégories et vidéos associées
    const categories = await Category.findAll({
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          include: [
            {
              model: Video,
              as: "subcategoryVideos", // Spécifier l'alias pour les vidéos associées aux sous-catégories
              include: [
                {
                  model: Tutorial,
                  as: "tutorial", // Alias pour les tutoriels
                },
              ],
            },
          ],
        },
        {
          model: Video, // Vidéos directement associées à la catégorie (si la catégorie n'a pas de sous-catégories)
          as: "categoryVideos", // Alias pour les vidéos associées aux catégories
          include: [
            {
              model: Tutorial,
              as: "tutorial", // Alias pour les tutoriels associés aux vidéos de catégorie
            },
          ],
        },
      ],
    });

    // Reformater les données pour respecter la structure fournie
    const formattedCategories = categories.map((category) => ({
      id: category.id.toString(),
      name: category.name,
      color: category.color,
      subcategories:
        category.subcategories.length > 0
          ? category.subcategories.map((subcategory) => ({
              id: subcategory.id.toString(),
              name: subcategory.name,
              color: subcategory.color,
              videos: subcategory.subcategoryVideos.map((video) => ({
                id: video.id.toString(),
                title: video.title,
                videoUrl: video.video_url, // Adaptation pour `video_url`
                downloadUrl: video.download_url, // Adaptation pour `video_url`
                pdfUrl: video.pdf_url || null, // Adaptation pour `pdf_url`
                tutorial: video.tutorial
                  ? {
                      id: video.tutorial.id.toString(),
                      title: video.tutorial.title,
                      videoUrl: video.tutorial.video_url, // Adaptation pour `video_url`*
                      downloadUrl: video.tutorial.download_url, // Adaptation pour `video_url`
                      pdfUrl: video.tutorial.pdf_url || null, // Adaptation pour `pdf_url`
                    }
                  : null,
              })),
            }))
          : [
              {
                id: category.id.toString(),
                name: category.name,
                videos: category.categoryVideos.map((video) => ({
                  id: video.id.toString(),
                  title: video.title,
                  videoUrl: video.video_url, // Adaptation pour `video_url`
                  downloadUrl: video.download_url, // Adaptation pour `video_url`
                  pdfUrl: video.pdf_url || null, // Adaptation pour `pdf_url`
                  tutorial: video.tutorial
                    ? {
                        id: video.tutorial.id.toString(),
                        title: video.tutorial.title,
                        videoUrl: video.tutorial.video_url, // Adaptation pour `video_url`
                        downloadUrl: video.tutorial.download_url, // Adaptation pour `video_url`
                        pdfUrl: video.tutorial.pdf_url || null, // Adaptation pour `pdf_url`
                      }
                    : null,
                })),
              },
            ],
    }));

    return formattedCategories;
  } catch (err) {
    console.error("Erreur lors de la récupération des vidéos :", err);
    throw new Error("Erreur lors de la récupération des vidéos");
  }
};
