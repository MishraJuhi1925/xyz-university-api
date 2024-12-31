const db = require('../config/config');
const CustomError = require('../utility/custome-errors');
const program = require('../model/program');

module.exports = class ProgramController {
    static async addDocument(context , document ){
        if ( !document.name || !document.code) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'required data is missing');
        }

        const existingProgram = await program.findOne({
            where: { code: document.code },
        });
    
        if (existingProgram) {
            throw new CustomError.BadRequestError('PROGRAM_CODE_ALREADY_EXISTS', 'This code is already exists');
        }

        const newProgram = await program.create({
            name: document.name,
            code: document.code,
            
        });

        throw new CustomError.SuccessRequest('SUCCESS', 'Document added successfully');

    }

    static async getAllPrograms(context) {
        const programs = await program.findAll();
        if (!programs || programs.length === 0) {
            throw new CustomError.NotFoundError('PROGRAMS_NOT_FOUND', 'No programs found');
        }

        throw new CustomError.SuccessRequest('SUCCESS', 'Programs retrieved successfully',programs);
    }

    static async getProgramById(context, id) {
        if (!id) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'Program ID is required');
        }

        const foundProgram = await program.findByPk(id);
        if (!foundProgram) {
            throw new CustomError.BadRequestError('PROGRAM_NOT_FOUND', 'Program not found');
        }

        throw new CustomError.SuccessRequest('SUCCESS', 'Program retrieved successfully', foundProgram);
    }

   
    
}