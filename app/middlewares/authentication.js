
const db = require('../config/config')
const jwt = require('../utility/jwt')
const CustomErrors = require('../utility/custome-errors')

module.exports = (req, res, next) => {
    try {
        req.context = req.context || {};
        const bearerToken = req.headers && req.headers.authorization && req.headers.authorization.replace('Bearer', '').trim();
        if (bearerToken) {
            req.context.user = jwt.validateToken(bearerToken);
        } else {
            return next(new CustomErrors.UnauthorizedError("INVALID_TOKEN", "invalid token"));
        }
        next()
    } catch (err) {
        next(new CustomErrors.UnauthorizedError("INVALID_TOKEN", "invalid token"))
    }
}