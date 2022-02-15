const express = require("express");
const router = express.Router();

const { confirmPickup, getAllPickups, getPickup } = require("../controllers/pickup");

router.route("/").get(getAllPickups);
router.route("/:id").get(getPickup);
router.route("/:id").post(confirmPickup);

module.exports = router;
