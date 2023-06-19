const ApiError = require('../Error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }
    const statusCode = err.status || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({ message: message })

}