const express = require("express");
const router = express.Router();

const {
  getAllItems,
  addCartItem,
  removeCartItem,
} = require("../controllers/cart");

router.route("/").get(getAllItems);
router.route("/add/:id").patch(addCartItem);
router.route("/remove/:id").patch(removeCartItem);

module.exports = router;
