
const CustomErrors = require('../utility/custome-errors');

module.exports = (roles) => {
    return function (req, res, next) {
        if (!req.context || !req.context.user) {
            return next(new CustomErrors.ForbiddenError("Unauthorized", "you are not allowed to perform this action"));
        }
        if (!roles.includes(req.context.user.role)) {
            return next(new CustomErrors.ForbiddenError("Unauthorized", "you are not allowed to perform this action"));
        }
        // if (req.context.user.role === 'dpo' && !req.context.user.is_verified) {
        //     return next(new CustomErrors.ForbiddenError("Unauthorized", "Please verify yourself first"));
        // }
        next()
    }
}
