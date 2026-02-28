// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true, 
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin", "trainer", "staff"],
    default: "user" 
  }
}, { timestamps: true });

userSchema.pre("save", async function () {
  if (this.role) {
    this.role = this.role.toLowerCase();
  }
});

module.exports = mongoose.model("User", userSchema);