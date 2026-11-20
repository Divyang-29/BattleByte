const pool = require("../config/db");

/* CREATE IMAGE */
const createGalleryImage = async (imagePath) => {
  const query = `
    INSERT INTO gallery (image)
    VALUES ($1)
    RETURNING *;
  `;

  const result = await pool.query(query, [imagePath]);
  return result.rows[0];
};

/* GET ALL IMAGES */
const getAllGalleryImages = async () => {
  const result = await pool.query(
    "SELECT * FROM gallery ORDER BY id DESC"
  );
  return result.rows;
};

module.exports = {
  createGalleryImage,
  getAllGalleryImages,
};