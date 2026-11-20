const express = require("express");
const {
  addTerms,
  fetchTerms,
  fetchSingleTerms,
  editTerms,
  removeTerms,
} = require("../controllers/termsController");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchTerms);
router.get("/:id", fetchSingleTerms);

/* ADMIN */
router.post("/", addTerms);
router.put("/:id", editTerms);
router.delete("/:id", removeTerms);

module.exports = router;