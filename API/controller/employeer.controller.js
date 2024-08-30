import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employee from '../model/employee.model.js';
import { validationResult } from 'express-validator';


const secretKey = 'nikki0623'; 



// Signup Controller
export const signup = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const result = await Employee.create({ username, email, password });

    // Generate JWT token
    const token = jwt.sign({ id: Employee.id }, 'nikki0623', { expiresIn: '1h' });;

    res.status(201).json({
      message: 'Successfully registered',
      user: { id: result.id, username: result.username, email: result.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Signin Controller
export const signin = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });

    if (employee && await employee.checkPassword(password)) {
      // Generate JWT token
      const token = jwt.sign({ id: employee.id }, 'nikki0623', { expiresIn: '1h' });

      res.status(200).json({
        message: 'Sign in successful',
        user: { id: employee.id, username: employee.username, email: employee.email },
        token,
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Employee.findByPk(userId); 
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
