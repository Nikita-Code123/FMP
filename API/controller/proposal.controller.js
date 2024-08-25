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

        const existingProposal = await Proposal.findOne({
            where: {
              freelancerId,
              projectId
            }
          });
      
          if (existingProposal) {
            return res.status(400).json({ error: 'You have already submitted a proposal for this project.' });
          }
      
          // Create and save the new proposal
          const newProposal = await Proposal.create({
            freelancerId,
            projectId,
            employeeId,
            coverLetter,
            proposedBudget,
            estimatedTimeline
          });
      
          res.status(201).json({ message: 'Proposal submitted successfully!', proposal: newProposal });
        } catch (err) {
          console.error('Error submitting proposal:', err);
          res.status(500).json({ error: 'Failed to submit proposal.' });
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
        
        const proposal = await Proposal.findOne({where : {employeeId : id}}, {
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
