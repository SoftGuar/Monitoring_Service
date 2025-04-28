import { DispoIssueModel, CreateDispoIssueInput, UpdateDispoIssueInput } from '../models/dispoIssue.model';
import { DispoIssueNotFoundError, MaintainerAssignmentError } from '../errors/dispoIssueErrors';

export const DispoIssueService = {
  createDispoIssue: async (dispoIssueData: CreateDispoIssueInput) => {
    return await DispoIssueModel.create(dispoIssueData);
  },

  getDispoIssueById: async (id: number) => {
    return await DispoIssueModel.findById(id);
  },

  getAllDispoIssues: async () => {
    return await DispoIssueModel.getAll();
  },

  getDispoIssuesByDispositiveId: async (dispositiveId: number) => {
    return await DispoIssueModel.getByDispositiveId(dispositiveId);
  },

  assignMaintainerToDispoIssue: async (id: number, maintainerId: number ) => {
    const dispoIssue = await DispoIssueModel.findById(id);
    if (!dispoIssue) {
      throw new DispoIssueNotFoundError(id);
    }
    
    return await DispoIssueModel.assignMaintainer(id, maintainerId);
  },

  updateDispoIssue: async (id: number, dispoIssueData: UpdateDispoIssueInput) => {
    const dispoIssue = await DispoIssueModel.findById(id);
    if (!dispoIssue) {
      throw new DispoIssueNotFoundError(id);
    }
    
    return await DispoIssueModel.update(id, dispoIssueData);
  },

  deleteDispoIssue: async (id: number) => {
    const dispoIssue = await DispoIssueModel.findById(id);
    if (!dispoIssue) {
      throw new DispoIssueNotFoundError(id);
    }
    
    return await DispoIssueModel.delete(id);
  }
};