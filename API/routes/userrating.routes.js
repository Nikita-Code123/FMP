import express from 'express';
import userratingController from '../controller/userrating.controller.js';

const router = express.Router();

// Routes for user ratings
router.post('/ratings', userratingController.createUserRating);
router.get('/ratings/user/:userId', userratingController.getRatingsByUser);
router.get('/ratings/:id', userratingController.getRatingById);
router.put('/ratings/:id', userratingController.updateUserRating);
router.delete('/ratings/:id', userratingController.deleteUserRating);

export default router;
