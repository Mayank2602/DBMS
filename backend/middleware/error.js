const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Mongo error : lets say id is supposed to be of 11 charcaters in postman but you enter id of 6 chadrcaters in postman then object will not be recognized
    // in such a case if you display error msg as err.stack then you will get a cast error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT error
    if (err.code === "JsonWebTokenError") {
        const message = `JSON web token is invalid. Try again!`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong Expire error
    if (err.code === "TokenExpiredError") {
        const message = `JSON web token has expired. Try again!`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message //you can also write err.stack thats displays the code location in postman whenever wrong product id is entered
    });
};