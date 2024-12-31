const {DataTypes}= require('sequelize')
const sequelize = require("../config/config");
const bcrypt = require('bcrypt');

const admin = sequelize.define('admin',{
    id :{
        type :DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
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
        beforeSave: async (admin) => {
            if (admin.password) {
                admin.password = await bcrypt.hash(admin.password, 10);
            }
        },
    },
})


admin.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = admin;

