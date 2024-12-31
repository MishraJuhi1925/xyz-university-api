const db = require('../config/config');
const CustomError = require('../utility/custome-errors');
const college = require('../model/college');
const jwt = require('../utility/jwt');
module.exports = class collegeController {
    static async register(context , document ){
        if (!document.name || !document.email || !document.password  || !document.confirmPassword) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'required data is missing');
        }

        const existingCollege = await college.findOne({
            where: { email: document.email },
        });
    
        if (existingCollege) {
            throw new CustomError.BadRequestError('EMAIL_ALREADY_EXISTS', 'This email is already registered');
        }

        const newCollege = await college.create({
            name: document.name,
            email: document.email,
            password: document.password,
            confirmPassword: document.confirmPassword,
        });

        throw new CustomError.SuccessRequest('SUCCESS', 'College registered successfully');

    }

    static async login(context, document) {
        if (!document.email || !document.password) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'Email and password are required');
        }
    
        const collegeData = await college.findOne({ 
            where: { email: document.email },
        });
    
        if (!collegeData) {
            throw new CustomError.BadRequestError('USER_NOT_FOUND', 'College not found');
        }
    
        const isPasswordMatch = await collegeData.comparePassword(document.password);
        if (!isPasswordMatch) {
            throw new CustomError.BadRequestError('INCORRECT_PASSWORD', 'Password does not match');
        }
    
        const token = jwt.generateToken({
            id: collegeData.id,
            email: collegeData.email,
        });
    
        return {
            success: true,
            message: 'Login successful',
            token,
        };
        

    }
    
}