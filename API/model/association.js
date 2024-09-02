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

    User.hasMany(Proposal, { foreignKey: 'freelancerId' }); //, as: 'proposals'
    Proposal.belongsTo(User, { foreignKey: 'freelancerId' }); //, as: 'freelancer'

    Project.hasMany(Proposal, { foreignKey: 'projectId' }); //, as: 'proposals' 
    Proposal.belongsTo(Project, { foreignKey: 'projectId' }); //, as: 'project'

    Employee.hasMany(Proposal, { foreignKey: 'employeeId' }); //, as: 'proposals'
    Proposal.belongsTo(Employee, { foreignKey: 'employeeId' }); //, as: 'employee' 

    // Payment Associations
    Payment.belongsTo(User, { foreignKey: 'userId' }); //, as: 'user'
    User.hasMany(Payment, { foreignKey: 'userId' }); //, as: 'payments'

    // Payment belongs to a Project
    Payment.belongsTo(Project, { foreignKey: 'projectId' }); //, as: 'project'
    Project.hasMany(Payment, { foreignKey: 'projectId' }); //, as: 'payments'

    // Payment belongs to a Proposal
    Payment.belongsTo(Proposal, { foreignKey: 'proposalId' }); //, as: 'proposal'
    Proposal.hasOne(Payment, { foreignKey: 'proposalId' });//, as: 'payment' 

    // Payment belongs to an Employee
    Payment.belongsTo(Employee, { foreignKey: 'employeeId' }); //, as: 'employee'
    Employee.hasMany(Payment, { foreignKey: 'employeeId' }); //, as: 'payments'

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
