const mongoose = require("mongoose");

const PickupSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  userId: mongoose.Types.ObjectId,
  status: {
    default: "PENDING",
    type: String,
  },
  pincode: Number,
  vehicle: {
    brand: String,
    model: String,
  },
  totalAmount: Number,
  services: [
    {
      name: String,
      vehicle: {
        brand: String,
        model: String,
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
});

module.exports = mongoose.model("Pickup", PickupSchema);
