const pool = require("../config/db");

/* CREATE AD */
const createAdvertisement = async (imagePath) => {
  const result = await pool.query(
    "INSERT INTO advertisements (image) VALUES ($1) RETURNING *",
    [imagePath]
  );
  return result.rows[0];
};

/* GET ALL ADS */
const getAdvertisements = async () => {
  const result = await pool.query(
    "SELECT * FROM advertisements ORDER BY id DESC"
  );
  return result.rows;
};

module.exports = {
  createAdvertisement,
  getAdvertisements,
};