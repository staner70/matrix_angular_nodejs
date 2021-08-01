const CustomError = require("../helpers/CustomError");

module.exports = {

    errorHandler: async (error, request, response, next) => {
        let customError = error;
        console.log(error.name);

        if (error.name === "SyntaxError") {
            customError = new CustomError("Unexpected Syntax", 400);

        }
        if (error.name === "ValidationError") {
            customError = new CustomError(error.message, 400)
        }
        if (error.name === "CastError") {
            customError = new CustomError("Please provide a valid id", 400);
        }
        if (error.code === 11000) {
            // Duplicate Key
            customError = new CustomError("Duplicate Key Found : Check Your Input",400);
        }
        // console.log(customError.message,customError.status);

        response.status(customError.status || 500)
        .json({
            success: false,
            message: customError.message || "Internal Server Error"
        })
    },
}