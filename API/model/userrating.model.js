
import sequelize from "../db/dbconnection.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js"; // Assuming User model exists
import Employee from "./employee.model.js";

const UserRating = sequelize.define("UserRating", {
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:Employee,
            key: 'id'
        }
    }
});

export default UserRating;
