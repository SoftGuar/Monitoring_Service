import prisma from '../services/prismaService';
import { InterventionStatus } from "@prisma/client";

export interface CreateInterventionInput {
    idMaintainer : number;
    idDispositive       : number;
    description  :string;
    type         :string;
    status       :InterventionStatus;
    end_date     :Date;
    start_date   :Date;
  }

export interface UpdateInterventionInput {
    idMaintainer?   : number;
    idDispositive ?        : number;
    description ?   :string;
    type?           :string;
    status?         :InterventionStatus;
    end_date ?      :Date;
    start_date?     :Date;
}

export const InterventionModel = {
  create: async (interventionData: CreateInterventionInput) => {
    try {
      return await prisma.intervention.create({
        data: interventionData,
      });
    } catch (error) {
      console.error('Error creating intervention:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.intervention.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error finding intervention by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.intervention.findMany({
      });
    } catch (error) {
      console.error('Error getting all interventions:', error);
      throw error;
    }
  },

  getInterventionsByMaintainerId : async(idMaintainer: number) => {
    try {
        return await prisma.intervention.findMany({
            where:{idMaintainer}
        });
      } catch (error) {
        console.error('Error getting maintainer interventions:', error);
        throw error;
      }
  },


  update: async (id: number, interventionData: UpdateInterventionInput) => {
    try {
      return await prisma.intervention.update({
        where: { id },
        data: interventionData,
      });
    } catch (error) {
      console.error('Error updating intervention:', error);
      throw error;
    }
  },

  updateStatus:async(id:number, status:InterventionStatus) =>{
    try {
        return await prisma.intervention.update({
          where: { id },
          data: { status},
        });
      } catch (error) {
        console.error('Error updating intervention:', error);
        throw error;
      }
  },

  delete: async (id: number) => {
    try {
      return await prisma.intervention.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting intervention:', error);
      throw error;
    }
  }
};