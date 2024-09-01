// models/employeeRating.model.js
import sequelize from "../db/dbconnection.js";
import { DataTypes } from "sequelize";
import Employee from "./employee.model.js"; // Assuming Employee model exists
import User from "./user.model.js"; // Assuming User model exists

const EmployeeRating = sequelize.define("EmployeeRating", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

export default EmployeeRating;
