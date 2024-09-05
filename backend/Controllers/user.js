const users = require("../models/user");
const { mailService } = require("../services/mail");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { userMail, userPassword } = req.body;

    if (!userMail || !userPassword) {
      res.status(400).json({ message: "Email and password are required" });
    }
    const userData = await users.findOne({
      mail: userMail,
    });

    if (!userData) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const match = await bcrypt.compare(userPassword, userData.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    return res.status(200).json({ message: "Successfully logged in" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { userName, userPassword, userMail, userContact } = req.body;
    if (!userName || !userPassword || !userMail || !userContact) {
      res.status(400).json({ message: "Please enter all the details" });
      return;
    }
    const userData = await users.findOne({
      mail: userMail,
    });

    if (userData) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (!userData) {
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const newUser = new users({
        userName: userName,
        mail: userMail,
        password: hashedPassword,
        contact: userContact,
      });

      await newUser.save();

      //email
      const mail = await mailService(process.env.USER_EMAIL, userMail);

      res.status(201).send({ message: "User created", UserData: newUser });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { login, signup };
