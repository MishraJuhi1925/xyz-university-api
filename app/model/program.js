// models/programModel.js
const {DataTypes}= require('sequelize')
const sequelize = require("../config/config");
const bcrypt = require('bcrypt');

const program = sequelize.define('program', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Program code must be unique.'
        },
        validate: {
           isNumeric: {
                msg: 'Program code must be a number.'
            },
            len: {
                args: [4, 4],
                msg: 'Program code must be exactly 4 digits.'
            }
        }
    }
}, {
    tableName: 'programs'
});


module.exports = program;
