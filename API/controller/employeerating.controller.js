import EmployeeRating from '../model/employeerating.model.js';
import Employee from '../model/employee.model.js';
import User from '../model/user.model.js';


const createEmployeeRating = async (req, res) => {
    try {
        const { rating, comment, employeeId, reviewerId } = req.body;
        const newRating = await EmployeeRating.create({ rating, comment, employeeId, reviewerId });
        res.status(201).json(newRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create rating' });
    }
};

// Get all ratings for a specific employee
const getRatingsByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const ratings = await EmployeeRating.findAll({
            where: { employeeId },
            include: [
                { model: User },
            ]
        });
        res.status(200).json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve ratings' });
    }
};

// Get a specific rating by ID
const getRatingById = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await EmployeeRating.findByPk(id, {
            include: [
                { model: User, as: 'reviewer', attributes: ['id', 'username'] }
            ]
        });
        if (rating) {
            res.status(200).json(rating);
        } else {
            res.status(404).json({ message: 'Rating not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve rating' });
    }
};

// Update a specific rating
const updateEmployeeRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const [updated] = await EmployeeRating.update({ rating, comment }, {
            where: { id }
        });
        if (updated) {
            const updatedRating = await EmployeeRating.findByPk(id);
            res.status(200).json(updatedRating);
        } else {
            res.status(404).json({ message: 'Rating not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update rating' });
    }
};

// Delete a specific rating
const deleteEmployeeRating = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await EmployeeRating.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Rating deleted' });
        } else {
            res.status(404).json({ message: 'Rating not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete rating' });
    }
};

export default {
    createEmployeeRating,
    getRatingsByEmployee,
    getRatingById,
    updateEmployeeRating,
    deleteEmployeeRating
};
