
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const CustomErrors = require('../utility/custome-errors')
const jwtConfig = {
    'algorithm': 'HS512',
    'expiresIn': '3h',
    'notBefore': '300s'
}

exports.generateToken = (user) => {
    if (!user || !user.id) {
        throw new CustomErrors.BadRequestError("INVALID_USER","user id not defined");
    }
    return jwt.sign(user, process.env.JWT_SECRET, {
        algorithm: jwtConfig.algorithm,
        expiresIn: jwtConfig.expiresIn,
        issuer: process.env.JWT_ISSUER,
        jwtid: crypto.createHash('md5').update(user.id + '').digest('hex')
    })
}

exports.validateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, {
        algorithm: [jwtConfig.algorithm],
        issuer: process.env.JWT_ISSUER,
        maxAge: jwtConfig.expiresIn
    });
}