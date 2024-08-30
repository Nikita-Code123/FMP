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


export const getProposal = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('Fetching proposal for employee ID:', id);

    const proposal = await Proposal.findAll({
      where: { employeeId: id },
      include: [
        { model: User },
        { model: Project },
        { model: Employee }
      ]
    });

    if (proposal) {
      return res.status(200).json({ proposal });
    } else {
      return res.status(404).json({ error: "Proposal not found" });
    }
  } catch (err) {
    console.error('Error fetching proposal:', err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptProposal = async (req, res) => {
  const { id } = req.params;
  try {
    await Proposal.update({ status: 'accepted' }, { where: { id } });
    res.status(200).json({ message: 'Proposal accepted' });
  } catch (err) {
    console.error('Error accepting proposal:', err);
    res.status(500).json({ error: 'Failed to accept proposal' });
  }
};

// Function to reject a proposal
export const rejectProposal = async (req, res) => {
  const { id } = req.params;
  try {
    await Proposal.update({ status: 'rejected' }, { where: { id } });
    res.status(200).json({ message: 'Proposal rejected' });
  } catch (err) {
    console.error('Error rejecting proposal:', err);
    res.status(500).json({ error: 'Failed to reject proposal' });
  }
};

export const getStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const proposal = await Proposal.findAll({
      where: { freelancerId: id },
      include: [
        { model: User },
        { model: Project },
        { model: Employee }
      ]
    });
    return res.status(200).json({ proposal });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Problem' })
  }
}
export const updateprojectStatus = async (req, res) => {
  const proposalId = parseInt(req.params.id, 10);

  try {
    const proposal = await Proposal.findOne({
      where: {
        id: proposalId
      }
    });
    proposal.projectstatus = 'completed';
    await proposal.save();

    return res.status(200).json({ message: 'Project status updated to completed' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAproposal=async (req, res) => {
  const proposalId = parseInt(req.params.id, 10);

  try {
   
    const proposal = await Proposal.findOne({
      where: { id: proposalId },
      include: [ 
        { model: Project },
        { model: Employee }
      ]
    });

    if (proposal) {
      return res.status(200).json({ proposal });
    } else {
      return res.status(404).json({ error: 'Proposal not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};