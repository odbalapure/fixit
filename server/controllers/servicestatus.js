const path = require("path");
const pdf = require("html-pdf");
const absPath = path.join(__dirname, "../documents");

const User = require("../models/User");
const Pickup = require("../models/Pickup");
const pdfTemplate = require("../documents");
require("dotenv").config();

/**
 * @desc Get pickup data
 * @param {*} req
 * @param {*} res
 */
const getPickup = async (req, res) => {
  const myServices = await Pickup.find({ userId: req.user.userId });
  res.status(200).json({ services: myServices });
};

/**
 * @desc Confirm pickup
 */
const confirmPickup = async (req, res) => {
  /* Send SMS notification for confirmation */
  const user = await User.findOne({ mobile: req.body.customerMobile });
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  console.log("Customer phone:", user.phone);

  /* Update the status */
  await Pickup.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },
    {
      new: true,
    }
  );

  /* Send the confirmation SMS */
  client.messages
  .create({
    body: `Hi ${user.name},\nYour vehicle will be picked up within 1/2hr.\nThanks,\nFIXIT ©`,
    from: process.env.TWILIO_PHONE_NO,
    to: user.phone,
  })
  .then((msg) => console.log("The message: ", msg))
  .catch((err) => console.log("The error: ", err));

  res.status(201).json({ msg: "Pickup has been confirmed!" });
};

/**
 * @desc Start service
 * @param {*} req
 * @param {*} res
 */
const startService = async (req, res) => {
  await Pickup.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },
    {
      new: true,
    }
  );

  res.status(201).json({ msg: "Servicing has started!" });
};

/**
 * @desc Finish service
 * @param {*} req
 * @param {*} res
 */
const finishService = async (req, res) => {
  await Pickup.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },
    {
      new: true,
    }
  );

  res
    .status(201)
    .json({ msg: "Servicing has finshed, preparing for delivery!" });
};

/**
 * @desc Finish service
 * @param {*} req
 * @param {*} res
 */
const rejectService = async (req, res) => {
  await Pickup.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },
    {
      new: true,
    }
  );

  res
    .status(201)
    .json({ msg: "Servicing has finshed, preparing for delivery!" });
};

module.exports = {
  confirmPickup,
  startService,
  finishService,
  rejectService,
  getPickup,
};
