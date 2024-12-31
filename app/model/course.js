// models/courseModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const program = require('./program'); 

const course = sequelize.define('course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Course code must be unique.'
        },
        validate: {
            isNumeric: {
                msg: 'Course code must be a number.'
            },
            len: {
                args: [4, 4],
                msg: 'Course code must be exactly 4 digits.'
            }
        }
    },
    course_type: {
        type: DataTypes.ENUM,
        values: ['Theory', 'Practical'], 
        allowNull: false,
        msg: 'Course type must be one of Online, Offline, or Hybrid.'
    },
    program_id: {
        type: DataTypes.INTEGER,
        references: {
            model: program, 
            key: 'id'
        },
       
    }
}, {
    tableName: 'courses',
    underscored: true
});

course.belongsTo(program, { foreignKey: 'program_id' });

module.exports = course;
