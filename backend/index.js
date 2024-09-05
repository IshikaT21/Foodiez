const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
};

db();
