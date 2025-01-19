const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

const app = express();
const port = 8000;

//----------------------------------------------Middleware----------------------------------------------

app.use(bodyParser.json()); // Middleware to parse JSON request body
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
    credentials: true, // Allow cookies
  })
); // Enable CORS for all origins { Cross-Origin Resource Sharing (CORS) }

app.use("/task", taskRoute);
app.use("/user", userRoute);

mongoose
  .connect("mongodb://127.0.0.1:27017/to-do-app")
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log("mongo connection error", err));

app.listen(port, () => console.log("server started"));
