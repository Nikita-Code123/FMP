import { validationResult } from "express-validator";
import Project from "../model/project.model.js";

export const posting = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ error: "Bad request", errors });
        }

        const { projectName, jobTitle, description, date, skills, budget, deadline, employeeId } = req.body;
        console.log(employeeId)
        let result = await Project.create({ projectName, description, skills, date, budget, deadline, jobTitle  , employeeId });
        if (result) {
            return res.status(200).json({ message: "Job Posted Successfully", result });
        }
        else {
            return res.status(500).json({ error: "Invalid Data Try Again" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Problem ! Try Again" });
    }
};

// export const updatePost = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(401).json({ message: "Bad Request", errors });
//         }

//         const { projectName, jobTitle, description, date, skills, budget, deadline } = req.body;
//         let post = await Project.findByPk(id);
//         if (post) {
//             let result = await Project.update({ projectName, jobTitle, description, date, skills, budget, deadline }, { where: { id } });
//             if (result) {
//                 return res.status(200).json({ message: "Post updated Successfully", result });
//             }
//             else {
//                 return res.status(500).json({ error: "Internal Server Problem" });
//             }
//         }
//         else {
//             return res.status(404).json({ error: "Post not found" });
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Internal Server Problem" });
//     }
// };


export const updatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Bad Request", errors });
        }

        const posts = req.body.posts; // Array of posts to be updated

        // Ensure that posts is an array
        if (!Array.isArray(posts)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Prepare an array of update promises
        const updatePromises = posts.map(post => {
            const { id, projectName, jobTitle, description, date, skills, budget, deadline } = post;
            return Project.update(
                { projectName, jobTitle, description, date, skills, budget, deadline },
                { where: { id } }
            );
        });

        // Execute all update promises
        const results = await Promise.all(updatePromises);

        // Check if all updates were successful
        const allUpdated = results.every(result => result[0] === 1); // result[0] is the number of rows affected

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

export const deletePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(401).json({ error: "Invalid input", errors });
        }

        let id = req.params.id;
        let post = await Project.findByPk(id);
        if (post) {
            let result = await Project.destroy({ where: { id } });
            if (result) {
                return res.status(200).json({ message: "Post deleted Successfully" });
            }
            else {
                return res.status(500).json({ error: "Internal Server Problem" });
            }
        }
        else {
            return res.status(404).json({ error: "Post not found" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Problem" });
    }
};

// export const getPost = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         let post = await Project.findByPk(id);
//         if (post) {
//             return res.status(200).json({post});
//         }
//         else {
//             return res.status(404).json({ error: "Post not found" });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Internal Server Problem" });
//     }
// };
// Fetch all posts by employeeId
export const getPost = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        let posts = await Project.findAll({ where: { employeeId } });
        if (posts.length > 0) {
            return res.status(200).json({ posts });
        }
        else {
            return res.status(404).json({ error: "No posts found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Problem" });
    }
};

