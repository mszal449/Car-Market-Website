// custom error class used in other 
class CustomAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = CustomAPIError