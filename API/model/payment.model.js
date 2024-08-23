import { DataTypes } from "sequelize";
import sequelize from "../db/dbconnection.js";

const Payment = sequelize.define("payments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending" // Other statuses could be "Completed", "Failed", etc.
    },
    paymentMethod: {
        type: DataTypes.STRING,
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
        
    proposalId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'proposals',
            key: 'id'
        },
        }
});

export default Payment;
