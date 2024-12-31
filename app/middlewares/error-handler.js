const {CustomeError} = require('../utility/custome-errors');

module.exports=(err,req,res,next)=>{
    if(err instanceof CustomeError){
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            success : false,
            error:{
                code:err.code,
                statusCode:statusCode,
                message : err.message,
                data: err.data,
            }
        });

    }
    else{

        res.status(500).json({
            success:false,
            error:{
                code :'INTERNAL SERVER ERROR',
                message: err.message|| 'Internal Server Error',
                statusCode : 500,
                stack: err.stack ? err.stack.toString() : null
            }
        })
    }
    next();
}