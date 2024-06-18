const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    selectedTable: {
      type: String,
      required: true,
    },
    selectedSlot: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Slot", SlotSchema);
