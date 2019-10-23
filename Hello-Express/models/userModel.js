"use strict";

const mongoose = require("./connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    passwordId: { type: mongoose.ObjectId, ref: "Password" }
  },
  { timestamps: true, versionKey: false }
);

const userPasswordSchema = new Schema({
  password: { type: String, required: true }
});

userSchema.methods.toJSON = function() {
  const user = this.toObject(); // this = user
  delete user.password;
  delete user.email;
  return user;
};

// creating token
userSchema.methods.genAuthToken = function() {
  return jwt.sign({ userId: this._id.toString() }, "token"); // this = user
};

// password hashing
userPasswordSchema.pre("save", async function(next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hashSync(this.password, 8);
      return next();
    }
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  User: model("User", userSchema),
  Password: model("Password", userPasswordSchema)
};
