const mongoose = require("mongoose");

// C
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  cityDistrictTown: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    required: true,
  },
  landmark: {
    type: String,
    min: 10,
    max: 100,
  },
  alternatePhone: {
    type: String,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["home", "work"],
    required: true,
  },
});

// B
const userAddressSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who owns this shipping information (for authenticated users)
      },
      sessionId: {
        type: String, // Session ID for guest users
      },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);