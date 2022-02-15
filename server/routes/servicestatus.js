const express = require("express");
const router = express.Router();

const {
  confirmPickup,
  startService,
  finishService,
  rejectService,
  getPickup,
} = require("../controllers/servicestatus");

router.route("/").get(getPickup);
router.route("/confirm/:id").patch(confirmPickup);
router.route("/start/:id").patch(startService);
router.route("/finish/:id").patch(finishService);
router.route("/reject/:id").patch(rejectService);

module.exports = router;
