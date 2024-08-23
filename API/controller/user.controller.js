
import User from "../model/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const secretKey = 'nikki0623';
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    algorithm: 'HS256',
    expiresIn: '1h', // Token expiration time
  });
};
// Signup Controller
export const signup = async (req, res, next) => {
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
    const token = generateToken(user);
    res.status(201).json({ message: "Successfully registered", user: { id: user.id, username: user.username, email: user.email },token });
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
    const user = await User.findOne({ where: { email } });

    if (user && user.checkPassword(password)) {
      const token = generateToken(user);
      // Generate a token here (if using JWT) and send it in the response
      res.status(200).json({ message: "Sign in successful", user: { id: user.id, username: user.username, email: user.email } ,token});
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
