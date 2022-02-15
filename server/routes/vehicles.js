const express = require("express");
const router = express.Router();

const {
  getAllVehicles,
  createVehicle,
  getVehicleServices
} = require("../controllers/vehicles");

router.get("/vehicles", getAllVehicles);
router.get("/services", getVehicleServices);
router.post("/vehicles", createVehicle);

module.exports = router;