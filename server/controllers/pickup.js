const Pickup = require("../models/Pickup");
const Cart = require("../models/Cart");

/**
 * @desc Confirm pickup
 */
const confirmPickup = async (req, res) => {
  /* Empty user cart */
  const cart = { services: [] };
  await Cart.findByIdAndUpdate({ _id: req.params.id }, cart, {
    new: false,
    runValidators: true,
  });

  const order = req.body;
  console.log("Book pickup for: ", req.user.userId);
  req.body.userId = req.user.userId;
  console.log("Order object: ", order);

  const pickup = await Pickup.create(req.body);
  res.status(201).json({ pickup, msg: "Pickup confirmed by FixIt center" });
};

/**
 * @desc Get pickup data
 */
const getPickup = async (req, res) => {
  const pickup = await Pickup.findOne({ _id: req.params.id });
  res.status(201).json({ pickup });
};

/**
 * @desc Get pickup data
 */
const getAllPickups = async (req, res) => {
  const pickups = await Pickup.find();
  res.status(201).json({ pickups, length: pickups.length });
};

module.exports = {
  confirmPickup,
  getAllPickups,
  getPickup,
};
