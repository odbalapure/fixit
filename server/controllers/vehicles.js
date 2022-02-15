const Vehicle = require("../models/Vehicle");

/**
 * @desc Get all vehicles
 * @param {*} req
 * @param {*} res
 */
const getAllVehicles = async (req, res) => {
  let search = req.query.brand;
  let vehicles = [];

  if (search) {
    vehicles = await Vehicle.find({
      manufacturer: { $regex: search, $options: "i" },
    });
  } else {
    vehicles = await Vehicle.find();
  }

  res.status(200).json({ vehicles, length: vehicles.length });
};

/**
 * @desc Get vehicle services
 * @param {*} req
 * @param {*} res
 */
const getVehicleServices = async (req, res) => {
  const manufacturer = req.query.brand;
  const model = req.query.model;

  const services = await Vehicle.findOne({
    manufacturer: { $regex: manufacturer, $options: "i" },
    name: { $regex: model, $options: "i" },
  });

  res.status(200).json({ services });
};

/**
 * @desc Create vehicle
 * @param {*} req
 * @param {*} res
 */
const createVehicle = async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json({ vehicle });
};

module.exports = { getAllVehicles, createVehicle, getVehicleServices };
