class CustomeError extends Error {
    constructor(code , message ,statusCode,data=null){
        super(message);
        this.code= code;
        this.name= this.constructor.name;
        this.statusCode = statusCode || 500;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends CustomeError {
    constructor(code , message){
        super(code ,message ,400)
    }
}

class SuccessRequest extends CustomeError {
    constructor(code, message, data = null) {
        super(code, message, 200, data); 
    }
}

class UnauthorizedError extends CustomeError {
    constructor(code, message) {
        super(code, message, 401);
    }
}


class ForbiddenError extends CustomeError {
    constructor(code, message) {
        super(code, message, 402);
    }
}

class InternalServerError extends CustomeError {
    constructor(code, message) {
        super(code, message, 500);
    }
}


module.exports = {
    CustomeError,
    BadRequestError,
    UnauthorizedError,
    SuccessRequest,
    ForbiddenError,
    InternalServerError
}