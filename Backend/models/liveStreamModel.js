const pool = require("../config/db");

/* CREATE LIVE STREAM */
const createLiveStream = async (
  bannerImage,
  title,
  gameName,
  streamerName,
  streamerImage,
  viewers,
  videoUrl
) => {
  const query = `
    INSERT INTO live_streams 
    (banner_image, title, game_name, streamer_name, streamer_image, viewers, video_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    bannerImage,
    title,
    gameName,
    streamerName,
    streamerImage,
    viewers,
    videoUrl,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/* GET ALL */
const getAllLiveStreams = async () => {
  const result = await pool.query(
    "SELECT * FROM live_streams ORDER BY id DESC"
  );
  return result.rows;
};

module.exports = {
  createLiveStream,
  getAllLiveStreams,
};