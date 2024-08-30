import User from "../model/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Project from "../model/project.model.js";
import Employee from "../model/employee.model.js";

const secretKey = 'nikki0623';
 
// Signup Controller
export const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

 
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ message: "Successfully registered", user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Signin Controller
export const signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && await user.checkPassword(password)) {
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: "Sign in successful", user: { id: user.id, username: user.username, email: user.email }, token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get Profile Controller
export const getprofile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// Get All Projects Controller
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{
        model: Employee,
        as: 'employee',
        attributes: ['id', 'username', 'email'] // Only select these fields
      }]
    });

    console.log('Fetched projects:', JSON.stringify(projects, null, 2));
    res.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
};
