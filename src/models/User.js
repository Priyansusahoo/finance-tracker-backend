const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, "Name is required"],
   },
   email: {
       type: String,
       required: [true, "Email is required"],
       unique: true,
       lowercase: true,
   },
   password: {
       type: String,
       required: [true, "Password is required"],
       minlength: 6,
   },
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// Compare passwords (used in login)
userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
