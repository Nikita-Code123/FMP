import { validationResult } from "express-validator";
import Project from "../model/project.model.js";
import Employee from "../model/employee.model.js";

// Posting a new job
export const posting = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad request", errors });
        }

        const { projectName, jobTitle, description, date, skills, budget, deadline, employeeId } = req.body;

        const result = await Project.create({ projectName, jobTitle, description, date, skills, budget, deadline, employeeId });

        if (result) {
            return res.status(201).json({ message: "Job Posted Successfully", result });
        } else {
            return res.status(500).json({ error: "Invalid Data Try Again" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Problem ! Try Again" });
    }
};

// Updating multiple posts
export const updatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Bad Request", errors });
        }

        const posts = req.body.posts; // Array of posts to be updated

        if (!Array.isArray(posts)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const updatePromises = posts.map(post => {
            const { id, projectName, jobTitle, description, date, skills, budget, deadline } = post;
            return Project.update(
                { projectName, jobTitle, description, date, skills, budget, deadline },
                { where: { id } }
            );
        });

        const results = await Promise.all(updatePromises);

        const allUpdated = results.every(result => result[0] === 1);

        if (allUpdated) {
            return res.status(200).json({ message: "Posts updated successfully" });
        } else {
            return res.status(500).json({ message: "Some posts could not be updated" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Problem" });
    }
};

// Deleting a post
export const deletePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Invalid input", errors });
        }

        const id = req.params.id;
        const post = await Project.findByPk(id);

        if (post) {
            const result = await Project.destroy({ where: { id } });

            if (result) {
                return res.status(200).json({ message: "Post deleted Successfully" });
            } else {
                return res.status(500).json({ error: "Internal Server Problem" });
            }
        } else {
            return res.status(404).json({ error: "Post not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Problem" });
    }
};

// Fetching posts by employeeId
export const getPost = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const posts = await Project.findAll({ where: { employeeId } });

       
            return res.status(200).json({ posts });
       
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Problem" });
    }
};
export const getUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Employee.findByPk(userId); // Example using Sequelize
  
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