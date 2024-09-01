import express from 'express';
import employeeratingController from '../controller/employeerating.controller.js';

const router = express.Router();

// Routes for employee ratings
router.post('/ratings', employeeratingController.createEmployeeRating);
router.get('/ratings/employee/:employeeId', employeeratingController.getRatingsByEmployee);
router.get('/ratings/:id', employeeratingController.getRatingById);
router.put('/ratings/:id', employeeratingController.updateEmployeeRating);
router.delete('/ratings/:id', employeeratingController.deleteEmployeeRating);

export default router;
