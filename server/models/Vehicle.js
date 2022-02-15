const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  type: String,
  cc: Number,
  manufacturer: String,
  services: [
    {
      name: String,
      cost: Number,
      image: String,
      features: [
        {
          name: String,
        },
      ],
      time: Number,
    },
  ],
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
