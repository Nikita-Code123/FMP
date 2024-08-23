import sequelize from "../db/dbconnection.js";
import { DataTypes } from "sequelize";

const Proposal = sequelize.define("proposals", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    freelancerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'projects',
            key: 'id'
        },
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id'
        },
        },
    coverLetter: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    proposedBudget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estimatedTimeline: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default Proposal;
