import { InterventionService } from '../services/interventionService';
import { InterventionModel } from '../models/intervention.model';
import { CreateInterventionInput, UpdateInterventionInput, UpdateInterventionReportInput } from '../models/intervention.model';
import { InterventionStatus } from '@prisma/client';

// Mock du modèle InterventionModel
jest.mock('../models/intervention.model', () => ({
  InterventionModel: {
    create: jest.fn(),
    findById: jest.fn(),
    getAll: jest.fn(),
    getInterventionsByMaintainerId: jest.fn(),
    update: jest.fn(),
    updateReport: jest.fn(),
    updateStatus: jest.fn(),
    delete: jest.fn(),
  }
}));

describe('InterventionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createIntervention', () => {
    it('should create a new intervention', async () => {
      // Arrange
      const mockIntervention = { 
        id: 1, 
        idMaintainer: 1,
        idDispositive: 1,
        description: 'Test Description',
        type: 'maintenance',
        status: InterventionStatus.pending,
        end_date: new Date('2025-05-01'),
        start_date: new Date('2025-04-01')
      };
      const createInterventionInput: CreateInterventionInput = {
        idMaintainer: 1,
        idDispositive: 1,
        description: 'Test Description',
        status:'pending',
        type: 'currative',
        start_date:new Date ('2025-4-1'),
        end_date: new Date('2025-05-01')
      };
      (InterventionModel.create as jest.Mock).mockResolvedValue(mockIntervention);

      // Act
      const result = await InterventionService.createIntervention(createInterventionInput);

      // Assert
      expect(InterventionModel.create).toHaveBeenCalledWith(createInterventionInput);
      expect(result).toEqual(mockIntervention);
    });
  });

  describe('getInterventionById', () => {
    it('should return an intervention by id', async () => {
      // Arrange
      const mockIntervention = { 
        id: 1, 
        idMaintainer: 1,
        idDispositive: 1,
        description: 'Test Description',
        type: 'currative',
        status: InterventionStatus.pending,
        end_date: new Date('2025-05-01'),
        start_date: new Date('2025-04-01')
      };
      (InterventionModel.findById as jest.Mock).mockResolvedValue(mockIntervention);

      // Act
      const result = await InterventionService.getInterventionById(1);

      // Assert
      expect(InterventionModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockIntervention);
    });
  });

  describe('getAllInterventions', () => {
    it('should return all interventions', async () => {
      // Arrange
      const mockInterventions = [
        { 
          id: 1, 
          idMaintainer: 1,
          idDispositive: 1,
          description: 'Test Description 1',
          type: 'maintenance',
          status: InterventionStatus.pending,
          end_date: new Date('2025-05-01'),
          start_date: new Date('2025-04-01')
        },
        { 
          id: 2, 
          idMaintainer: 2,
          idDispositive: 2,
          description: 'Test Description 2',
          type: 'repair',
          status: InterventionStatus.inProgress,
          end_date: new Date('2025-06-01'),
          start_date: new Date('2025-04-15')
        }
      ];
      (InterventionModel.getAll as jest.Mock).mockResolvedValue(mockInterventions);

      // Act
      const result = await InterventionService.getAllInterventions();

      // Assert
      expect(InterventionModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockInterventions);
    });
  });

  describe('getInterventionsByMaintainerId', () => {
    it('should return interventions by maintainer id', async () => {
      // Arrange
      const mockInterventions = [
        { 
          id: 1, 
          idMaintainer: 1,
          idDispositive: 1,
          description: 'Test Description 1',
          type: 'maintenance',
          status: InterventionStatus.pending,
          end_date: new Date('2025-05-01'),
          start_date: new Date('2025-04-01')
        },
        { 
          id: 3, 
          idMaintainer: 1,
          idDispositive: 3,
          description: 'Test Description 3',
          type: 'inspection',
          status: InterventionStatus.done,
          end_date: new Date('2025-04-20'),
          start_date: new Date('2025-04-10')
        }
      ];
      (InterventionModel.getInterventionsByMaintainerId as jest.Mock).mockResolvedValue(mockInterventions);

      // Act
      const result = await InterventionService.getInterventionsByMaintainerId(1);

      // Assert
      expect(InterventionModel.getInterventionsByMaintainerId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockInterventions);
    });
  });

  describe('updateIntervention', () => {
    it('should update an intervention', async () => {
      // Arrange
      const mockIntervention = { 
        id: 1, 
        idMaintainer: 1,
        idDispositive: 1,
        description: 'Test Description',
        type: 'maintenance',
        status: InterventionStatus.pending,
        end_date: new Date('2025-05-01'),
        start_date: new Date('2025-04-01')
      };
      const updateData: UpdateInterventionInput = { 
        description: 'Updated Description',
        end_date: new Date('2025-05-15')
      };
      const updatedMockIntervention = { 
        ...mockIntervention, 
        ...updateData 
      };
      
      (InterventionModel.update as jest.Mock).mockResolvedValue(updatedMockIntervention);

      // Act
      const result = await InterventionService.updateIntervention(1, updateData);

      // Assert
      expect(InterventionModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedMockIntervention);
    });
  });

  describe('updateInterventionReport', () => {
    it('should update an intervention report', async () => {
      // Arrange
      const reportData: UpdateInterventionReportInput = { 
        title: 'Report Title',
        description: 'Report Description'
      };
      const updatedMockIntervention = { 
        id: 1,
        idMaintainer: 1,
        idDispositive: 1,
        description: 'Test Description',
        type: 'maintenance',
        status: InterventionStatus.done,
        end_date: new Date('2025-05-01'),
        start_date: new Date('2025-04-01'),
        report: {
          id: 1,
          interventionId: 1,
          title: 'Report Title',
          description: 'Report Description',
          created_at: new Date()
        }
      };
      
      (InterventionModel.updateReport as jest.Mock).mockResolvedValue(updatedMockIntervention);

      // Act
      const result = await InterventionService.updateInterventionReport(1, reportData);

      // Assert
      expect(InterventionModel.updateReport).toHaveBeenCalledWith(1, reportData);
      expect(result).toEqual(updatedMockIntervention);
    });
  });

  describe('updateInterventionStatus', () => {
    it('should update an intervention status', async () => {
      // Arrange
      const mockIntervention = { 
        id: 1, 
        idMaintainer: 1,
        idDispositive: 1,
        description: 'Test Description',
        type: 'maintenance',
        status: InterventionStatus.pending,
        end_date: new Date('2025-05-01'),
        start_date: new Date('2025-04-01')
      };
      const newStatus = InterventionStatus.inProgress;
      const updatedMockIntervention = { 
        ...mockIntervention, 
        status: newStatus 
      };
      
      (InterventionModel.updateStatus as jest.Mock).mockResolvedValue(updatedMockIntervention);

      // Act
      const result = await InterventionService.updateInterventionStatus(1, newStatus);

      // Assert
      expect(InterventionModel.updateStatus).toHaveBeenCalledWith(1, newStatus);
      expect(result).toEqual(updatedMockIntervention);
    });
  });

  describe('deleteIntervention', () => {
    it('should delete an intervention', async () => {
      // Arrange
      (InterventionModel.delete as jest.Mock).mockResolvedValue({ success: true });

      // Act
      const result = await InterventionService.deleteIntervention(1);

      // Assert
      expect(InterventionModel.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });
  });
});