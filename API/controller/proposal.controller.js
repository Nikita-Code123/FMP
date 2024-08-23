import { validationResult } from "express-validator";
import Proposal from "../model/proposal.model.js";
import User from "../model/user.model.js";
import Project from "../model/project.model.js";
import Employee from "../model/employee.model.js";

export const proposal = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ error: "Bad request", errors });
        }

        const { freelancerId, projectId, employeeId, coverLetter, proposedBudget, estimatedTimeline } = req.body;

        const proposal = await Proposal.create({
            freelancerId,
            projectId,
            employeeId,
            coverLetter,
            proposedBudget,
            estimatedTimeline
        });

        if (proposal) {
            return res.status(200).json({ message: "Proposal submitted successfully", proposal });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateProposal = async (req, res, next) => {
    try {
        const id = req.params.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ error: "Bad request", errors });
        }

        const { coverLetter, proposedBudget, estimatedTimeline } = req.body;

        const [updated] = await Proposal.update(
            { coverLetter, proposedBudget, estimatedTimeline },
            { where: { id } }
        );

        if (updated) {
            return res.status(200).json({ message: "Proposal updated successfully" });
        } else {
            return res.status(404).json({ error: "Proposal not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteProposal = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleted = await Proposal.destroy({ where: { id } });

        if (deleted) {
            return res.status(200).json({ message: "Proposal deleted successfully" });
        } else {
            return res.status(404).json({ error: "Proposal not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getProposal = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const proposal = await Proposal.findByPk(id, {
            include: [
                { model: User },//, as: 'freelancerId'
                { model: Project }, //, as: 'projectId'
                { model: Employee}//, as: 'employeeId' 
            ]
        });

        if (proposal) {
            return res.status(200).json({ proposal });
        } else {
            return res.status(404).json({ error: "Proposal not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
