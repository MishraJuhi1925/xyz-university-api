const db = require('../config/config');
const CustomError = require('../utility/custome-errors');
const admin = require('../model/auth');
const jwt = require('../utility/jwt');
module.exports = class AuthController {
    static async register(context , document ){
        if ( !document.email || !document.password  || !document.confirmPassword) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'required data is missing');
        }

        const existingAdmin = await admin.findOne({
            where: { email: document.email },
        });
    
        if (existingAdmin) {
            throw new CustomError.BadRequestError('EMAIL_ALREADY_EXISTS', 'This email is already registered');
        }

        const newAdmin = await admin.create({
            email: document.email,
            password: document.password,
            confirmPassword: document.confirmPassword,
        });

        throw new CustomError.SuccessRequest('SUCCESS', 'Admin registered successfully',newAdmin);

    }

    static async login(context, document) {
        if (!document.email || !document.password) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'Email and password are required');
        }
    
        const adminData = await admin.findOne({ 
            where: { email: document.email },
        });
    
        if (!adminData) {
            throw new CustomError.BadRequestError('USER_NOT_FOUND', 'Admin not found');
        }
    
        const isPasswordMatch = await adminData.comparePassword(document.password);
        if (!isPasswordMatch) {
            throw new CustomError.BadRequestError('INCORRECT_PASSWORD', 'Password does not match');
        }
    
        const token = jwt.generateToken({
            id: adminData.id,
            email: adminData.email,
        });
    
        return {
            success: true,
            message: 'Login successful',
            token,
        };
    }
    
}