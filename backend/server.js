require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"))


mongoose.connect("mongodb://127.0.0.1:27017/agriLibrary")
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));

app.listen(5000, () => console.log("Server running on 5000"));