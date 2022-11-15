class ErrorHander extends Error {
    constructor(message, statusCode) {
        super(message); //super is the constructor of Error class
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);

    }

}

module.exports = ErrorHander