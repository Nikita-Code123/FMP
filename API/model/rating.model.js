import sequelize from "../db/dbconnection.js";
import { DataTypes } from "sequelize";

const Rating = sequelize.define("Rating", {
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
            model: 'users',
            key: 'id'
        }
    },
    proposalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Proposals',
            key: 'id'
        }
    },
    reviewerRole: {
        type: DataTypes.ENUM('freelancer', 'employer'),
        allowNull: false
    }
});

export default Rating;
