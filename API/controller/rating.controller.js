import { validationResult } from "express-validator";
import Rating from "../model/rating.model.js";
import User from "../model/user.model.js";
import Proposal from "../model/proposal.model.js";

// Controller to create a rating
export const createRating = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad request", errors: errors.array() });
        }

        const { rating, comment, userId, proposalId, reviewerRole } = req.body;

        // Verify if the user and proposal exist
        const user = await User.findByPk(userId);
        const proposal = await Proposal.findByPk(proposalId);

        if (!user || !proposal) {
            return res.status(404).json({ error: "User or Proposal not found" });
        }

        const newRating = await Rating.create({
            rating,
            comment,
            userId,
            proposalId,
            reviewerRole
        });

        return res.status(201).json({ message: "Rating created successfully", rating: newRating });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to update a rating
export const updateRating = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad request", errors: errors.array() });
        }

        const ratingId = req.params.id;
        const { rating, comment } = req.body;

        const existingRating = await Rating.findByPk(ratingId);

        if (!existingRating) {
            return res.status(404).json({ error: "Rating not found" });
        }

        existingRating.rating = rating || existingRating.rating;
        existingRating.comment = comment || existingRating.comment;

        await existingRating.save();

        return res.status(200).json({ message: "Rating updated successfully", rating: existingRating });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to get a rating
export const getRating = async (req, res) => {
    try {
        const ratingId = req.params.id;

        const rating = await Rating.findByPk(ratingId);

        if (!rating) {
            return res.status(404).json({ error: "Rating not found" });
        }

        return res.status(200).json({ rating });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to delete a rating
export const deleteRating = async (req, res) => {
    try {
        const ratingId = req.params.id;

        const rating = await Rating.findByPk(ratingId);

        if (!rating) {
            return res.status(404).json({ error: "Rating not found" });
        }

        await Rating.destroy({ where: { id: ratingId } });

        return res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to get all ratings for a specific user
export const getUserRatings = async (req, res) => {
    try {
        const userId = req.params.userId;

        const ratings = await Rating.findAll({ where: { userId } });

        if (ratings.length === 0) {
            return res.status(404).json({ error: "No ratings found for this user" });
        }

        return res.status(200).json({ ratings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to get all ratings for a specific proposal
export const getProposalRatings = async (req, res) => {
    try {
        const proposalId = req.params.proposalId;

        const ratings = await Rating.findAll({ where: { proposalId } });

        if (ratings.length === 0) {
            return res.status(404).json({ error: "No ratings found for this proposal" });
        }

        return res.status(200).json({ ratings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Problem" });
    }
};
