import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../db/dbconnection.js";

const Employee =sequelize.define("employees",{
    id :{
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true
    },
    username :{
        type : DataTypes.STRING,
        allowNull : false ,
    },
    email :{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Validate email format
        }
    },
    password :{
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hashedPassword = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hashedPassword);
        }
    }
});
// Password comparison method
Employee.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
export default Employee;