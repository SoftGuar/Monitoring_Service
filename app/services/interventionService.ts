import { InterventionModel, CreateInterventionInput, UpdateInterventionInput } from '../models/intervention.model';
import { InterventionStatus } from '@prisma/client'; 


export const InterventionService = {
  createIntervention: async (interventionData: CreateInterventionInput) => {

    return InterventionModel.create(interventionData);
  },

  getInterventionById: async (id: number) => {
    return InterventionModel.findById(id);
  },

  getAllInterventions: async () => {
    return InterventionModel.getAll();
  },

  getInterventionsByMaintainerId:async (idMaintainer: number)=>{
    return InterventionModel.getInterventionsByMaintainerId(idMaintainer);

  },

  updateIntervention: async (id: number, interventionData: UpdateInterventionInput) => {
    return InterventionModel.update(id, interventionData);
  },

  
  updateInterventionStatus: async (id: number, status: InterventionStatus) => {
    return InterventionModel.updateStatus(id, status);
  },


  deleteIntervention: async (id: number) => {
    return InterventionModel.delete(id);
  }
};
