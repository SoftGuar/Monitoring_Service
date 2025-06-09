import { InterventionModel, CreateInterventionInput, UpdateInterventionInput, UpdateInterventionReportInput } from '../models/intervention.model';
import { InterventionStatus } from '@prisma/client'; 
import { InterventionNotFoundError, InvalidInterventionStatusError, InterventionUpdateError, InterventionReportUpdateError } from '../errors/interventionErrors';

export const InterventionService = {
  createIntervention: async (interventionData: CreateInterventionInput) => {
    return InterventionModel.create(interventionData);
  },

  getInterventionById: async (id: number) => {
    const intervention = await InterventionModel.findById(id);
    if (!intervention) {
      throw new InterventionNotFoundError(id);
    }
    return intervention;
  },

  getAllInterventions: async () => {
    return InterventionModel.getAll();
  },

  getInterventionsByMaintainerId: async (idMaintainer: number) => {
    return InterventionModel.getInterventionsByMaintainerId(idMaintainer);
  },

  getInterventionsByidDevice:async (idDispositive: number)=>{
    return InterventionModel.getInterventionsByidDevice(idDispositive);

  },


  updateIntervention: async (id: number, interventionData: UpdateInterventionInput) => {
    const intervention = await InterventionModel.findById(id);
    if (!intervention) {
      throw new InterventionNotFoundError(id);
    }
    return InterventionModel.update(id, interventionData);
  },

  updateInterventionReport: async (interventionId: number, reportData: UpdateInterventionReportInput) => {
    const intervention = await InterventionModel.findById(interventionId);
    if (!intervention) {
      throw new InterventionNotFoundError(interventionId);
    }
    return InterventionModel.updateReport(interventionId, reportData);
  },
  
  updateInterventionStatus: async (id: number, status: InterventionStatus) => {
    const intervention = await InterventionModel.findById(id);
    if (!intervention) {
      throw new InterventionNotFoundError(id);
    }
    
    
    return InterventionModel.updateStatus(id, status);
  },

  deleteIntervention: async (id: number) => {
    const intervention = await InterventionModel.findById(id);
    if (!intervention) {
      throw new InterventionNotFoundError(id);
    }
    return InterventionModel.delete(id);
  }
};