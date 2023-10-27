const {StatusCodes} = require('http-status-codes')
const errorhandlerMiddleware = (err, req, res, next) => {
    // create an instance of custom error
    let customError = {
        // set default values
        statusCode : err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong please try again later'
    }

    if(err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
        .map(item => item.message)
        .join(',')
        customError.StatusCode = StatusCodes.BAD_REQUEST
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please provide another value`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }   

    return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorhandlerMiddleware