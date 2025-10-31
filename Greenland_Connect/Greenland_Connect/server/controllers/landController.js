const Land = require("../models/LandModel");

// Create Land
const createLand = async (req, res) => {
  try {
    const land = await Land.create(req.body);
    res.status(201).json({
      success: true,
      message: "Land created successfully",
      data: land,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Lands
const getAllLands = async (req, res) => {
  try {
    const lands = await Land.find();
    res.status(200).json({
      success: true,
      data: lands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit Land
const updateLand = async (req, res) => {
  try {
    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLand) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Land updated successfully",
      data: updatedLand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Land
const deleteLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndDelete(req.params.id);

    if (!land) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Land deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createLand,
  getAllLands,
  updateLand,
  deleteLand,
};
