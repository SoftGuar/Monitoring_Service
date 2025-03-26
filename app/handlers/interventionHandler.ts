import { FastifyRequest, FastifyReply } from 'fastify';
import { InterventionService } from '../services/interventionService';
import { CreateInterventionInput, UpdateInterventionInput } from '../models/intervention.model';
import { InterventionStatus } from '@prisma/client';

export const createIntervention = async (
  request: FastifyRequest<{ Body: CreateInterventionInput }>,
  reply: FastifyReply
) => {
  try {
    const interventionData = request.body;
    const newIntervention = await InterventionService.createIntervention(interventionData);
    
    return reply.code(201).send({ success: true, data: newIntervention });
  } catch (error) {
    return reply.code(400).send({ success: false, message: error instanceof Error ? error.message : 'An unexpected error occurred' });
  }
};

export const getInterventions = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const interventions = await InterventionService.getAllInterventions();
    return reply.code(200).send({ success: true, data: interventions });
  } catch (error) {
    return reply.code(500).send({ success: false, message: 'An unexpected error occurred' });
  }
};

export const getInterventionById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const intervention = await InterventionService.getInterventionById(Number(id));

    if (!intervention) {
      return reply.code(404).send({ success: false, message: 'Intervention not found' });
    }
    return reply.code(200).send({ success: true, data: intervention });
  } catch (error) {
    return reply.code(500).send({ success: false, message: 'An unexpected error occurred' });
  }
};

export const getInterventionsByMaintainerId = async (
    request: FastifyRequest<{ Params: { idMaintainer: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { idMaintainer } = request.params;
      const maintainerInterventions = await InterventionService.getInterventionsByMaintainerId(Number(idMaintainer));
  
      return reply.code(200).send({ success: true, data: maintainerInterventions });
  
    } catch (error) {
      console.error('Error fetching maintainer interventions:', error);
      return reply.code(500).send({ success: false, message: 'An unexpected error occurred' });
    }
  };
  
  



export const updateIntervention = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateInterventionInput }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const interventionData = request.body;
    
    const updatedIntervention = await InterventionService.updateIntervention(Number(id), interventionData);
    return reply.code(200).send({ success: true, data: updatedIntervention });
  } catch (error) {
    return reply.code(400).send({ success: false, message: error instanceof Error ? error.message : 'An unexpected error occurred' });
  }
};

export const updateInterventionStatus = async (
    request: FastifyRequest<{ Params: { id: string }, Body: {status:InterventionStatus}}>,
    reply: FastifyReply
  ) => {
    try {
      const { id } = request.params;
      const {status} = request.body;
      
      const updatedIntervention = await InterventionService.updateInterventionStatus(Number(id), status);
      return reply.code(200).send({ success: true, data: updatedIntervention });
    } catch (error) {
      return reply.code(400).send({ success: false, message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  };
  
  
export const deleteIntervention = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    await InterventionService.deleteIntervention(Number(id));
    return reply.code(200).send({ success: true, message: 'intervention deleted successfully' });
  } catch (error) {
    return reply.code(500).send({ success: false, message: 'An unexpected error occurred' });
  }
};
