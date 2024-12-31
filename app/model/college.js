const {DataTypes}= require('sequelize')
const sequelize = require("../config/config");
const bcrypt = require('bcrypt');

const college = sequelize.define('college',{
    id :{
        type :DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:{
                msg :' Please provide a valid email'
            },
            notEmpty:{
                msg : ' Email is required',
            }
        }
    },
    password:{
       type: DataTypes.STRING,
       allowNull:false,
       validate:{
        len:{
            args :[6,20],
            msg : 'Password must be between 6 to 20 characters',
        },
        notEmpty:{
            msg : 'Password is required',
        }
       }
    },
    confirmPassword: { 
        type: DataTypes.VIRTUAL,
        allowNull: true,
        validate: {
            isPasswordMatch() {
                if (this.password !== this.confirmPassword) {
                    throw new Error('Password and confirm password do not match');
                }
            }
        }
    },
},{
    timestamps: true,
    hooks: {
        beforeSave: async (college) => {
            if (college.password) {
                college.password = await bcrypt.hash(college.password, 10);
            }
        },
    },
})


college.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = college;

