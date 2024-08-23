import { DataTypes } from "sequelize";
import sequelize from "../db/dbconnection.js";
import Employee from "./employee.model.js";

const Project = sequelize.define("projects", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skills: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull : false,
        defaultValue: DataTypes.NOW

    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    ,
    deadline: {
        type: DataTypes.DATE
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeId :{
        type : DataTypes.INTEGER,
        references :{
           model :Employee,
           key : 'id'
        }
    }
})



export default Project;