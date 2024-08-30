import sequelize from '../db/dbconnection.js';
import { DataTypes } from 'sequelize';
// Define the Proposal model
const Proposal = sequelize.define('Proposal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  freelancerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User', // Ensure the model name is correct
      key: 'id'
    },
    allowNull: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Project', 
      key: 'id'
    },
    allowNull: false
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Employee', 
      key: 'id'
    },
    allowNull: true 
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  proposedBudget: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false
  },
  estimatedTimeline: {
    type: DataTypes.DATEONLY, 
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'), 
    defaultValue: 'pending'
  },
  projectstatus: {
    type: DataTypes.ENUM( 'completed', 'incompleted'), 
    defaultValue: 'incompleted'
  }
}, {
  tableName: 'proposals', 
  timestamps: true 
});


export default Proposal;
