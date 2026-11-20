const express = require("express");
const {
  addTeamMember,
  fetchAllTeamMembers,
  fetchTeamMemberById,
} = require("../controllers/teamController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* PUBLIC ROUTES */
router.get("/", fetchAllTeamMembers);
router.get("/:id", fetchTeamMemberById);

/* ADMIN ROUTE */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addTeamMember
);

module.exports = router;