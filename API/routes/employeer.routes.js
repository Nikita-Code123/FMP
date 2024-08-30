import express from 'express';
import { body } from "express-validator";
import { signin, signup } from '../controller/employeer.controller.js';
import { authenticateJWT } from './authmiddleware.js';
import { acceptProposal, getStatus, rejectProposal } from '../controller/proposal.controller.js'
import { getUserProfile, deletePost, getPost, posting, updatePost } from "../controller/jobPosting.controller.js";
const router = express.Router();
router.get("/post/:id",
     authenticateJWT, getPost);

router.post("/Login",
      body("email", "email id is not correct").isEmail(),
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
     authenticateJWT,
     body("projectName", "Project name is required").notEmpty(),
     body("description", " Kindly enter your project description").notEmpty()
     , posting);

router.put("/updatePost",
     authenticateJWT, updatePost);
router.delete("/deletePost/:id",
     authenticateJWT, deletePost);
router.get('/profile/:id',
     authenticateJWT, getUserProfile);

router.post('/accept/:id', authenticateJWT, acceptProposal);
router.post('/reject/:id', authenticateJWT, rejectProposal);
router.get('/status/:id', getStatus)

export default router;
