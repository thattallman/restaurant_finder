const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/auth");
const crypto = require("crypto");
// Schema for storing user 
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
);

// hashing the password and saving the respective hash as the password
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

// function to check and compare the hash of the passord provided by the user and the saved hash
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("user not found ");

    const salt = user.salt;
    const hashedPassword = user.password;

  
    const userProvidedHash = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (userProvidedHash === hashedPassword) {
      return createTokenForUser(user);
    } else {
      throw new Error("incorrect pasword ");
    }
  }
);

const USER = model("User", userSchema);
module.exports = USER;
