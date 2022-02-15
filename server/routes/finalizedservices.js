const express = require("express");
const router = express.Router();

const {
  getFinalizedServices,
  sendInvoice,
  getInvoice,
} = require("../controllers/finalizedservices");

router.route("/").get(getFinalizedServices);
router.route("/").post(sendInvoice);
router.route("/invoice").get(getInvoice);

module.exports = router;
