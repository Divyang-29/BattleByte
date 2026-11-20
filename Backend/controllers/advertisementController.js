const {
  createAdvertisement,
  getAdvertisements,
} = require("../models/advertisementModel");

/* ADMIN - ADD AD */
const addAdvertisement = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Advertisement image is required",
      });
    }

    const imagePath = req.file.filename;

    const ad = await createAdvertisement(imagePath);

    res.status(201).json({
      message: "Advertisement created successfully",
      data: ad,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* PUBLIC - GET ADS */
const fetchAdvertisements = async (req, res) => {
  try {
    const ads = await getAdvertisements();

    res.json({
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addAdvertisement,
  fetchAdvertisements,
};