import express from 'express';
import { body } from "express-validator";
import { signin, signup } from '../controller/employeer.controller.js';
import {getUserProfile, deletePost, getPost, posting, updatePost } from "../controller/jobPosting.controller.js";
const router = express.Router();
router.get("/post/:id",getPost);
router.post("/Login", body("email", "email id is not correct").isEmail(),
     body("email", "email id is required").notEmpty(),
     body("password", "password is required").notEmpty(),
     body("password", "password must contain at least 4 letter").isLength({ min: 4 }), signin);

router.post("/Registration",
     body("username", "username is required").notEmpty(),
     body("email", "email id is required").notEmpty(),
     body("email", "email id is not correct").isEmail(),
     body("password", "password is required").notEmpty(),
     body("password", "password must contain at least 4 letter").isLength({ min: 4 }), signup);


router.post("/JobPosting",
     body("projectName", "Project name is required").notEmpty(),
     body("description", " Kindly enter your project description").notEmpty()
     , posting);

router.put("/updatePost", updatePost);
router.delete("/deletePost/:id",deletePost);
router.get('/profile/:id', getUserProfile);


export default router;