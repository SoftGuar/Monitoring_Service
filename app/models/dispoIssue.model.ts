import prisma from '../services/prismaService';

export interface CreateDispoIssueInput {
  dispositiveId: number;
  description: string;
  date: Date;
  status?: string;
  maintainerId?: number | null; 
}

export interface UpdateDispoIssueInput {
  dispositiveId?: number;
  description?: string;
  status?: string;
  maintainerId?: number;
}

export const DispoIssueModel = {
  create: async (dispoIssueData: CreateDispoIssueInput) => {
    try {
      return await prisma.dispoIssue.create({
        data: dispoIssueData,
      });
    } catch (error) {
      console.error('Error creating DispoIssue:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.dispoIssue.findUnique({
        where: { id },
        include: {
          Dispositive: true,
          Maintainer: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
              // password est explicitement omis
            }
          }
        }
      });
    } catch (error) {
      console.error('Error finding DispoIssue by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.dispoIssue.findMany({
        include: {
          Dispositive: true,
          Maintainer: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
              // password est explicitement omis
            }
          }
        }
      });
    } catch (error) {
      console.error('Error getting all DispoIssues:', error);
      throw error;
    }
  },

  getByDispositiveId: async (dispositiveId: number) => {
    try {
      return await prisma.dispoIssue.findMany({
        where: { dispositiveId },
        include: {
          Dispositive: true,
          Maintainer: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
              // password est explicitement omis
            }
          }
        }
      });
    } catch (error) {
      console.error('Error getting DispoIssues by dispositiveId:', error);
      throw error;
    }
  },

  assignMaintainer: async (id: number, maintainerId: number) => {
    try {
      return await prisma.dispoIssue.update({
        where: { id },
        data: { maintainerId },
        include: {
          Dispositive: true,
          Maintainer: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
              // password est explicitement omis
            }
          }
        }
      });
    } catch (error) {
      console.error('Error assigning maintainer to DispoIssue:', error);
      throw error;
    }
  },

  update: async (id: number, dispoIssueData: UpdateDispoIssueInput) => {
    try {
      return await prisma.dispoIssue.update({
        where: { id },
        data: dispoIssueData,
        include: {
          Dispositive: true,
          Maintainer: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
              // password est explicitement omis
            }
          }
        }
      });
    } catch (error) {
      console.error('Error updating DispoIssue:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.dispoIssue.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting DispoIssue:', error);
      throw error;
    }
  }
};