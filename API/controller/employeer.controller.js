
import bcrypt from "bcryptjs";
import Employee from "../model/employee.model.js";
import { validationResult } from "express-validator";

// Signup Controller
export const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const result = await Employee.create({ username, email, password });

    res.status(201).json({ message: "Successfully registered", user: { id: result.id, username: result.username, email: result.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Signin Controller
export const signin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });

    if (employee && employee.checkPassword(password)) {
      res.status(200).json({ message: 'Sign in successful', user: { id: employee.id, username: employee.username, email: employee.email } });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
