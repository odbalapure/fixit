const Cart = require("../models/Cart");

/**
 * @desc  Get all items from cart
 * @param {*} req
 * @param {*} res
 */
const getAllItems = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.userId });
  res.status(200).json({ services: cart.services });
};

/**
 * @desc  Add an item the cart
 * @param {*} req
 * @param {*} res
 */
const addCartItem = async (req, res) => {
  Cart.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { services: req.body } },
    { safe: true, upsert: true, new: true },
    function (err) {
      if (err) {
        console.log("Error while adding item to the cart: ", err);
      } else {
        console.log("Cart updated!");
      }
    }
  );

  res.status(200).json({ msg: `Item added to cart!` });
};

/**
 * @desc  Remove an item from cart
 * @param {*} req
 * @param {*} res
 */
const removeCartItem = async (req, res) => {
  Cart.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { services: { _id: req.body.itemId } } },
    { upsert: false },
    function (err) {
      if (err) {
        console.log("Error while removing item from the cart: ", err);
      } else {
        console.log("Cart updated!");
      }
    }
  );

  res.status(204).json({ msg: `Item ${req.params.id} was removed!` });
};

module.exports = { getAllItems, addCartItem, removeCartItem };
