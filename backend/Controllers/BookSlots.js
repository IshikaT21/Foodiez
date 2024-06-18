//const express = require("express");
const Slots = require("../models/Slots");

const BookingSlots = async (req, res) => {
  try {
    const { name, email, contactNumber, selectedTable, selectedSlot } =
      req.body;

    if (!name || !email || !contactNumber || !selectedTable || !selectedSlot) {
      res.status(201).send({ message: "Please fill all the details" });
    }

    const slotAlreadyBooked = await Slots.findOne({
      selectedTable: selectedTable,
      selectedSlot: selectedSlot,
    });
    console.log("slotAlreadyBooked: ", slotAlreadyBooked);
    if (slotAlreadyBooked === null) {
      const slot = new Slots({
        name,
        email,
        contactNumber,
        selectedTable,
        selectedSlot,
      });
      await slot.save();
      res.status(200).send({ message: "Slot successfully booked" });
    } else {
      res.status(500).send({ message: "Slot is booked already" });
    }
  } catch (error) {
    console.log(error);
  }
};

const alreadyBookedSlots = async (req, res) => {
  try {
    const slotsAlreadyBooked = await Slots.find(
      {},
      { selectedSlot: 1, selectedTable: 1 }
    );
    console.log(slotsAlreadyBooked);
    res.send(slotsAlreadyBooked);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { BookingSlots, alreadyBookedSlots };
