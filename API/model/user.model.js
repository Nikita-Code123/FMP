import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../db/dbconnection.js";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Validate email format
        }
    },
    password: {
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
User.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


export default User;
