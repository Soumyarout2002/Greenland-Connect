const express = require("express");
const {
  createLand,
  getAllLands,
  updateLand,
  deleteLand,
} = require("../controllers/landController"); // importing from landController
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Create Land
router.post("/createLand", createLand);

// Get All Lands
router.get("/getAllLands",authenticateUser,getAllLands);

// Update Land
router.put("/updateLandData/:id", updateLand);

// Delete Land
router.delete("/deleteLand/:id", deleteLand);

module.exports = router;
