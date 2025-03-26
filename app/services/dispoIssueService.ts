import { DispoIssueModel, CreateDispoIssueInput, UpdateDispoIssueInput } from '../models/dispoIssue.model';

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
      throw new Error('DispoIssue not found');
    }
    
    return await DispoIssueModel.assignMaintainer(id, maintainerId);
  },

  updateDispoIssue: async (id: number, dispoIssueData: UpdateDispoIssueInput) => {
    const dispoIssue = await DispoIssueModel.findById(id);
    if (!dispoIssue) {
      throw new Error('DispoIssue not found');
    }
    
    return await DispoIssueModel.update(id, dispoIssueData);
  },

  deleteDispoIssue: async (id: number) => {
    const dispoIssue = await DispoIssueModel.findById(id);
    if (!dispoIssue) {
      throw new Error('DispoIssue not found');
    }
    
    return await DispoIssueModel.delete(id);
  }
};