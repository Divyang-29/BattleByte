const {
  createLiveStream,
  getAllLiveStreams,
} = require("../models/liveStreamModel");

/* ADD LIVE STREAM (ADMIN) */
const addLiveStream = async (req, res) => {
  try {
    const {
      title,
      game_name,
      streamer_name,
      viewers,
      video_url,
    } = req.body;

    if (
      !title ||
      !game_name ||
      !streamer_name ||
      !video_url ||
      !req.files?.banner_image ||
      !req.files?.streamer_image
    ) {
      return res.status(400).json({
        message: "All fields and images are required",
      });
    }

    const bannerImage = req.files.banner_image[0].filename;
    const streamerImage = req.files.streamer_image[0].filename;

    const newStream = await createLiveStream(
      bannerImage,
      title,
      game_name,
      streamer_name,
      streamerImage,
      viewers || 0,
      video_url
    );

    res.status(201).json({
      message: "Live stream created successfully",
      data: newStream,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL (PUBLIC) */
const fetchLiveStreams = async (req, res) => {
  try {
    const streams = await getAllLiveStreams();

    res.json({
      count: streams.length,
      data: streams,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addLiveStream,
  fetchLiveStreams,
};