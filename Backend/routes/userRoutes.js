const express = require("express");
const { registerUser, loginUser,fetchAllUsers } = require("../controllers/userController");

const auth = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/admin/users", auth, adminMiddleware, fetchAllUsers);

module.exports = router;
