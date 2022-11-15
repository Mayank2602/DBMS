const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Resiter a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl"
        },
    });

    sendToken(user, 201, res);

});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checking if both email and password are given
    if (!email || !password) {
        return next(new ErrorHander("Please enter email and password"), 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password"), 401);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password"), 401);
    }
    const token = user.getJWTToken();

    sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()), //the token expires immediately
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    //Get resetPasswordToken
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}` //req.protocol will be http mostly and req.host will be localhost

    const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\nIf you have not requested this URL then please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: `Soleful Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message, 500));
    }
});

//Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHander("Reset password token is invalid or has expired", 404));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});




//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});


//Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Old Password is incorrect"), 400);
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("Password doesn't match"), 400);
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    //We will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

//get all users (admin) //admin can retreive the details of all the users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

//get single user (admin) //admin can retreive the details of all the users
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User does not exist with this id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

//Update User Role -- admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

//Delete User -- admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    //We will add cloudinary later

    if (!user) {
        return next(new ErrorHander(`User does not exist with this Id: ${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});





