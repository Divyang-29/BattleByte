const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByIdentifier,
  getAllUsers
} = require("../models/userModel");

/* REGISTER */
const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    // 🔥 All fields mandatory now
    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        message: "Username, email, phone and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role === "admin" ? "admin" : "user";

    const newUser = await createUser(
      username,
      email,
      phone,
      hashedPassword,
      userRole
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* LOGIN */
const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Identifier and password are required",
      });
    }

    const user = await findUserByIdentifier(identifier);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user.id,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  fetchAllUsers
};