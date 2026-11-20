const {
  createGalleryImage,
  getAllGalleryImages,
} = require("../models/galleryModel");

/* ADD IMAGE (ADMIN) */
const addGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const imagePath = req.file.filename;

    const newImage = await createGalleryImage(imagePath);

    res.status(201).json({
      message: "Image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL (PUBLIC) */
const fetchGalleryImages = async (req, res) => {
  try {
    const images = await getAllGalleryImages();

    res.json({
      count: images.length,
      data: images,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addGalleryImage,
  fetchGalleryImages,
};