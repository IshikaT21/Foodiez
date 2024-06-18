const express = require("express");
const {
  BookingSlots,
  alreadyBookedSlots,
} = require("../Controllers/BookSlots");

const router = express.Router();

router.post("/slots/bookSlot", BookingSlots);

router.get("/slots/bookedSlots", alreadyBookedSlots);

module.exports = router;
