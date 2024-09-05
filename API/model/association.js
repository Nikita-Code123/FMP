import sequelize from '../db/dbconnection.js';
import User from './user.model.js';
import Employee from './employee.model.js';
import Project from './project.model.js';
import Proposal from './proposal.model.js';
import Payment from './payment.model.js';
import UserRating from './userrating.model.js';
import EmployeeRating from './employeerating.model.js';

const defineAssociations = () => {

    Employee.belongsToMany(Project, { through: 'EmployeeProjects' });
    Project.belongsToMany(Employee, { through: 'EmployeeProjects' });

    User.hasMany(Proposal, { foreignKey: 'freelancerId' }); 
    Proposal.belongsTo(User, { foreignKey: 'freelancerId' }); 

    Project.hasMany(Proposal, { foreignKey: 'projectId' });
    Proposal.belongsTo(Project, { foreignKey: 'projectId' });

    Employee.hasMany(Proposal, { foreignKey: 'employeeId' });
    Proposal.belongsTo(Employee, { foreignKey: 'employeeId' });

    // Payment Associations
    Payment.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(Payment, { foreignKey: 'userId' }); 

    // Payment belongs to a Project
    Payment.belongsTo(Project, { foreignKey: 'projectId' });
    Project.hasMany(Payment, { foreignKey: 'projectId' }); 

    // Payment belongs to a Proposal
    Payment.belongsTo(Proposal, { foreignKey: 'proposalId' }); 
    Proposal.hasOne(Payment, { foreignKey: 'proposalId' });

    // Payment belongs to an Employee
    Payment.belongsTo(Employee, { foreignKey: 'employeeId' }); 
    Employee.hasMany(Payment, { foreignKey: 'employeeId' }); 

    Project.belongsTo(Employee, { foreignKey: 'employeeId' });
    Employee.hasMany(Project, { foreignKey: 'employeeId' });
    
    Project.belongsToMany(Employee, { through: 'EmployeeProjects' });
    Employee.belongsToMany(Project, { through: 'EmployeeProjects' });

    User.hasMany(UserRating, { foreignKey: 'userId' });
    UserRating.belongsTo(User, { foreignKey: 'userId' });

    Employee.hasMany(EmployeeRating, { foreignKey: 'employeeId' });
    EmployeeRating.belongsTo(Employee, { foreignKey: 'employeeId' });

    User.hasMany(EmployeeRating, { foreignKey: 'reviewerId' });
    EmployeeRating.belongsTo(User, { foreignKey: 'reviewerId' });

    
    Employee.hasMany(UserRating, { foreignKey: 'reviwerId' });
    UserRating.belongsTo(Employee, { foreignKey: 'reviewerId' });
};

// Sync models and associations
const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log("Successfully Created All Tables");
    } catch (error) {
        console.error("Trouble in creating tables", error);
    }
};

// Execute the functions
defineAssociations();
syncModels();

export { defineAssociations, syncModels };
