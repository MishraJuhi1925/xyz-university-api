const db = require('../config/config');
const CustomError = require('../utility/custome-errors');
const course = require('../model/course');
const program = require('../model/program')

module.exports = class CourseController {
    static async addCourse(context, document) {
        if (!document.course_name || !document.course_code || !document.course_type || !document.program_id) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'Required data is missing');
        }
        const existingCourse = await course.findOne({
            where: { course_code: document.course_code },
        });

        if (existingCourse) {
            throw new CustomError.BadRequestError('COURSE_CODE_ALREADY_EXISTS', 'This course code already exists');
        }
        const existingProgram = await program.findByPk(document.program_id);
        if (!existingProgram) {
            throw new CustomError.BadRequestError('PROGRAM_NOT_FOUND', 'The provided program ID does not exist');
        }

        const newCourse = await course.create({
            course_name: document.course_name,
            course_code: document.course_code,
            course_type: document.course_type,
            program_id: document.program_id,
        });

        throw new CustomError.SuccessRequest('SUCCESS', 'Course added successfully', newCourse);
    }

    static async getAllCourses(context) {
        const courses = await course.findAll();
        if (!courses || courses.length === 0) {
            throw new CustomError.NotFoundError('COURSES_NOT_FOUND', 'No courses found');
        }

        throw new CustomError.SuccessRequest('SUCCESS', 'Courses retrieved successfully', courses);
    }

    static async getCourseById(context, id) {
        if (!id) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'Course ID is required');
        }

        const foundCourse = await course.findByPk(id);
        if (!foundCourse) {
            throw new CustomError.BadRequestError('COURSE_NOT_FOUND', 'Course not found');
        }

        throw new CustomError.SuccessRequest('SUCCESS', 'Course retrieved successfully', foundCourse);
    }

    static async getCoursesByProgram(context, programId) {
        if (!programId) {
            throw new CustomError.BadRequestError('INVALID_PAYLOAD', 'Program ID is required');
        }

        const courses = await course.findAll({
            where: { program_id: programId }
        });

        if (!courses || courses.length === 0) {
            throw new CustomError.NotFoundError('COURSES_NOT_FOUND', 'No courses found for this program');
        }

        throw new CustomError.SuccessRequest('SUCCESS', 'Courses retrieved successfully for the program', courses);
    }
}
