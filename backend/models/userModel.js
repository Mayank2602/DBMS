const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false //this means find method will never reveal the pswd
    },
    avatar: { //same as image for product, here avatar is for user profile image
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
//this means before saving the userSchema, we encrypt the password
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10); //here 10 is the power of the password
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE, //this is actually the time after which the the id automatically logs out
    });
}

//Compare password function user in userController.js
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); //this.password is the encrypted password, bcrypt compares the enteredpassword with the decrypted version of the password in the db
};


//Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to user Schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 100; //converted to ms

    return resetToken; //now we have to send this token via mail when user clicks on forgot pswd
}

module.exports = mongoose.model("User", userSchema)