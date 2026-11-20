const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));

const authRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const faqRoutes = require("./routes/faqRoutes");
const liveStreamRoutes = require("./routes/liveStreamRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
const termRoutes = require("./routes/termRoutes");
const privacyRoutes = require("./routes/privacyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const tagRoute = require("./routes/tagRoutes");
const matchRoutes = require("./routes/matchRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const productRoutes = require("./routes/productRoutes");
const termsRoutes = require("./routes/termsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/live-streams", liveStreamRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/terms", termRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/tags", tagRoute);
app.use("/api/matches", matchRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/terms", termsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "🚀 BattleByte Backend Running",
      serverTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🔥 BattleByte Server running on port ${PORT}`);
});
