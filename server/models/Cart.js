const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  userName: {
    type: String,
  },
  services: [
    {
      name: String,
      vehicle: {
        brand: String,
        model: String
      },
      time: Number,
      cost: Number,
      features: [
        {
          name: String,
        },
      ],
    },
  ],
  total: Number,
});

module.exports = mongoose.model("Cart", CartSchema);
