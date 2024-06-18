const express = require("express");
const mongoose = require("mongoose");
const bookSlots = require("./routes/bookSlots");
const paymentRoute = require("./routes/Payment");
// const imageUpload = require("./routes/imageUpload");
const excelSheetData = require("./routes/excelSheetDataToJson");
const login = require("./routes/authRoutes");
const signup = require("./routes/authRoutes");
const saveproducts = require("./routes/saveSheetDataToDb");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(
    "mongodb+srv://Ishika:Tiw%40ri21@cluster0.uxcvg59.mongodb.net/SlotAssign?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"));

app.use(bodyParser.json());
app.use(cors());
app.use("/", bookSlots);
app.use("/", paymentRoute);
// app.use("/", imageUpload);
app.use("/", excelSheetData);
app.use("/", saveproducts);
app.use("/", login);
app.use("/", signup);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
