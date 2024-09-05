const express = require("express");
const { login, signup } = require("../Controllers/user");
const {
  BookingSlots,
  alreadyBookedSlots,
} = require("../Controllers/BookSlots");

const router = express.Router();

router.get("/user/login", login);
router.post("/user/signup", signup);
// router.post("/slots/bookSlot", BookingSlots);
// router.get("/slots/bookedSlots", alreadyBookedSlots);
// router.get("/excelData");

module.exports = router;
