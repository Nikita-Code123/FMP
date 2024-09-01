import UserRating from '../model/userrating.model.js';
import User from '../model/user.model.js';

// Create a new UserRating
const createUserRating = async (req, res) => {
    try {
        const { rating, comment, userId, reviewerId } = req.body;
        const newRating = await UserRating.create({ rating, comment, userId, reviewerId });
        res.status(201).json(newRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create rating' });
    }
};

// Get all ratings for a specific user
const getRatingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const ratings = await UserRating.findAll({
            where: { userId },
            include: [
                { model: User, as: 'reviewer', attributes: ['id', 'username'] }
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
        const rating = await UserRating.findByPk(id, {
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
const updateUserRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const [updated] = await UserRating.update({ rating, comment }, {
            where: { id }
        });
        if (updated) {
            const updatedRating = await UserRating.findByPk(id);
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
const deleteUserRating = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserRating.destroy({
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
    createUserRating,
    getRatingsByUser,
    getRatingById,
    updateUserRating,
    deleteUserRating
};
