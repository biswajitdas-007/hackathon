const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema(
  {
        username: { type: String, required: true },
        password: { type: String, required: true }
  },
  {
    versionKey: false
  }
);


const Retailer = new mongoose.model("retailer", retailerSchema);

module.exports = Retailer;