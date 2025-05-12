import { DispoIssueService } from '../services/dispoIssueService';
import { DispoIssueModel } from '../models/dispoIssue.model';
import { CreateDispoIssueInput, UpdateDispoIssueInput } from '../models/dispoIssue.model';

// Mock du modèle DispoIssueModel
jest.mock('../models/dispoIssue.model', () => ({
  DispoIssueModel: {
    create: jest.fn(),
    findById: jest.fn(),
    getAll: jest.fn(),
    getByDispositiveId: jest.fn(),
    assignMaintainer: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}));

describe('DispoIssueService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createDispoIssue', () => {
    it('should create a new dispo issue', async () => {
      // Arrange
      const mockDispoIssue = { 
        id: 1, 
        dispositiveId: 1, 
        description: 'Test Description',
        date: new Date(),
        status: 'pending',
        maintainerId: null
      };
      const createDispoIssueInput: CreateDispoIssueInput = {
        dispositiveId: 1,
        description: 'Test Description'
      };
      (DispoIssueModel.create as jest.Mock).mockResolvedValue(mockDispoIssue);

      // Act
      const result = await DispoIssueService.createDispoIssue(createDispoIssueInput);

      // Assert
      expect(DispoIssueModel.create).toHaveBeenCalledWith(createDispoIssueInput);
      expect(result).toEqual(mockDispoIssue);
    });
  });

  describe('getDispoIssueById', () => {
    it('should return a dispo issue by id', async () => {
      // Arrange
      const mockDispoIssue = { 
        id: 1, 
        dispositiveId: 1, 
        description: 'Test Description',
        date: new Date(),
        status: 'pending',
        maintainerId: null
      };
      (DispoIssueModel.findById as jest.Mock).mockResolvedValue(mockDispoIssue);

      // Act
      const result = await DispoIssueService.getDispoIssueById(1);

      // Assert
      expect(DispoIssueModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDispoIssue);
    });
  });

  describe('getAllDispoIssues', () => {
    it('should return all dispo issues', async () => {
      // Arrange
      const mockDispoIssues = [
        { 
          id: 1, 
          dispositiveId: 1, 
          description: 'Test Description 1',
          date: new Date(),
          status: 'pending',
          maintainerId: null
        },
        { 
          id: 2, 
          dispositiveId: 2, 
          description: 'Test Description 2',
          date: new Date(),
          status: 'pending',
          maintainerId: 1
        }
      ];
      (DispoIssueModel.getAll as jest.Mock).mockResolvedValue(mockDispoIssues);

      // Act
      const result = await DispoIssueService.getAllDispoIssues();

      // Assert
      expect(DispoIssueModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockDispoIssues);
    });
  });

  describe('getDispoIssuesByDispositiveId', () => {
    it('should return dispo issues by dispositive id', async () => {
      // Arrange
      const mockDispoIssues = [
        { 
          id: 1, 
          dispositiveId: 1, 
          description: 'Test Description 1',
          date: new Date(),
          status: 'pending',
          maintainerId: null
        },
        { 
          id: 2, 
          dispositiveId: 1, 
          description: 'Test Description 2',
          date: new Date(),
          status: 'pending',
          maintainerId: null
        }
      ];
      (DispoIssueModel.getByDispositiveId as jest.Mock).mockResolvedValue(mockDispoIssues);

      // Act
      const result = await DispoIssueService.getDispoIssuesByDispositiveId(1);

      // Assert
      expect(DispoIssueModel.getByDispositiveId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDispoIssues);
    });
  });

  describe('assignMaintainerToDispoIssue', () => {
    it('should assign a maintainer to a dispo issue', async () => {
      // Arrange
      const mockDispoIssue = { 
        id: 1, 
        dispositiveId: 1, 
        description: 'Test Description',
        date: new Date(),
        status: 'pending',
        maintainerId: null
      };
      const updatedMockDispoIssue = { 
        ...mockDispoIssue, 
        maintainerId: 2 
      };
      
      (DispoIssueModel.findById as jest.Mock).mockResolvedValue(mockDispoIssue);
      (DispoIssueModel.assignMaintainer as jest.Mock).mockResolvedValue(updatedMockDispoIssue);

      // Act
      const result = await DispoIssueService.assignMaintainerToDispoIssue(1, 2);

      // Assert
      expect(DispoIssueModel.findById).toHaveBeenCalledWith(1);
      expect(DispoIssueModel.assignMaintainer).toHaveBeenCalledWith(1, 2);
      expect(result).toEqual(updatedMockDispoIssue);
    });

    it('should throw an error if dispo issue not found', async () => {
      // Arrange
      (DispoIssueModel.findById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(DispoIssueService.assignMaintainerToDispoIssue(1, 2))
        .rejects.toThrow('DispoIssue not found');
      expect(DispoIssueModel.assignMaintainer).not.toHaveBeenCalled();
    });
  });

  describe('updateDispoIssue', () => {
    it('should update a dispo issue', async () => {
      // Arrange
      const mockDispoIssue = { 
        id: 1, 
        dispositiveId: 1, 
        description: 'Test Description',
        date: new Date(),
        status: 'pending',
        maintainerId: null
      };
      const updateData: UpdateDispoIssueInput = { 
        description: 'Updated Description',
        status: 'in-progress'
      };
      const updatedMockDispoIssue = { 
        ...mockDispoIssue, 
        ...updateData 
      };
      
      (DispoIssueModel.findById as jest.Mock).mockResolvedValue(mockDispoIssue);
      (DispoIssueModel.update as jest.Mock).mockResolvedValue(updatedMockDispoIssue);

      // Act
      const result = await DispoIssueService.updateDispoIssue(1, updateData);

      // Assert
      expect(DispoIssueModel.findById).toHaveBeenCalledWith(1);
      expect(DispoIssueModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedMockDispoIssue);
    });

    it('should throw an error if dispo issue not found', async () => {
      // Arrange
      const updateData: UpdateDispoIssueInput = { description: 'Updated Description' };
      (DispoIssueModel.findById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(DispoIssueService.updateDispoIssue(1, updateData))
        .rejects.toThrow('DispoIssue not found');
      expect(DispoIssueModel.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteDispoIssue', () => {
    it('should delete a dispo issue', async () => {
      // Arrange
      const mockDispoIssue = { 
        id: 1, 
        dispositiveId: 1, 
        description: 'Test Description',
        date: new Date(),
        status: 'pending',
        maintainerId: null
      };
      (DispoIssueModel.findById as jest.Mock).mockResolvedValue(mockDispoIssue);
      (DispoIssueModel.delete as jest.Mock).mockResolvedValue({ success: true });

      // Act
      const result = await DispoIssueService.deleteDispoIssue(1);

      // Assert
      expect(DispoIssueModel.findById).toHaveBeenCalledWith(1);
      expect(DispoIssueModel.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });

    it('should throw an error if dispo issue not found', async () => {
      // Arrange
      (DispoIssueModel.findById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(DispoIssueService.deleteDispoIssue(1))
        .rejects.toThrow('DispoIssue not found');
      expect(DispoIssueModel.delete).not.toHaveBeenCalled();
    });
  });
});