import prisma from '../services/prismaService';
import { InterventionStatus } from "@prisma/client";

export interface CreateInterventionInput {
    idMaintainer: number;
    idDispositive: number;
    description: string;
    type: string;
    status: InterventionStatus;
    end_date: Date;
    start_date: Date;
}

export interface UpdateInterventionInput {
    idMaintainer?: number;
    idDispositive?: number;
    description?: string;
    type?: string;
    status?: InterventionStatus;
    end_date?: Date;
    start_date?: Date;
}

export interface UpdateInterventionReportInput {
    title: string;
    description: string;
}

export const InterventionModel = {
  create: async (interventionData: CreateInterventionInput) => {
    try {
      // Création de l'intervention avec un rapport vide en même temps
      return await prisma.intervention.create({
        data: {
          ...interventionData,
          // Création automatique d'un rapport vide
          report: {
            create: {
              title: "",
              description: ""
            }
          }
        },
        // Inclure le rapport dans la réponse
        include: {
          report: true
        }
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
        include: {
          report: true
        }
      });
    } catch (error) {
      console.error('Error finding intervention by ID:', error);
      throw error;
    }
  },
  
  getAll: async () => {
    try {
      return await prisma.intervention.findMany({
        include: {
          report: true
        }
      });
    } catch (error) {
      console.error('Error getting all interventions:', error);
      throw error;
    }
  },
  
  getInterventionsByMaintainerId: async(idMaintainer: number) => {
    try {
        return await prisma.intervention.findMany({
            where: { idMaintainer },
            include: {
              report: true
            }
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
        include: {
          report: true
        }
      });
    } catch (error) {
      console.error('Error updating intervention:', error);
      throw error;
    }
  },
  
  updateStatus: async(id: number, status: InterventionStatus) => {
    try {
        return await prisma.intervention.update({
          where: { id },
          data: { status },
          include: {
            report: true
          }
        });
      } catch (error) {
        console.error('Error updating intervention status:', error);
        throw error;
      }
  },
  
  updateReport: async (interventionId: number, reportData: UpdateInterventionReportInput) => {
    try {
      // Mise à jour du rapport associé à l'intervention
      return await prisma.interventionReport.update({
        where: { interventionId },
        data: reportData
      });
    } catch (error) {
      console.error('Error updating intervention report:', error);
      throw error;
    }
  },
  
  delete: async (id: number) => {
    try {
      // Le rapport sera automatiquement supprimé grâce à la relation onDelete: Cascade
      return await prisma.intervention.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting intervention:', error);
      throw error;
    }
  }
};