import { FastifyRequest, FastifyReply } from 'fastify';
import { DispoIssueService } from '../services/dispoIssueService';
import { CreateDispoIssueInput, UpdateDispoIssueInput } from '../models/dispoIssue.model';

export const createDispoIssue = async (
  request: FastifyRequest<{ Body: CreateDispoIssueInput }>,
  reply: FastifyReply
) => {
    const dispoIssueData = request.body;
    const newDispoIssue = await DispoIssueService.createDispoIssue(dispoIssueData);
    
    return reply.code(201).send({ success: true, data: newDispoIssue });
};

export const getDispoIssues = async (request: FastifyRequest, reply: FastifyReply) => {
    const dispoIssues = await DispoIssueService.getAllDispoIssues();
    return reply.code(200).send({ success: true, data: dispoIssues });

};

export const getDispoIssueById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {

    const { id } = request.params;
    const dispoIssue = await DispoIssueService.getDispoIssueById(Number(id));

    if (!dispoIssue) {
      return reply.code(404).send({ success: false, message: 'DispoIssue not found' });
    }
    return reply.code(200).send({ success: true, data: dispoIssue });
};

export const getDispoIssuesByDispositiveId = async (
  request: FastifyRequest<{ Params: { dispositiveId: string } }>,
  reply: FastifyReply
) => {
    const { dispositiveId } = request.params;
    const dispoIssues = await DispoIssueService.getDispoIssuesByDispositiveId(Number(dispositiveId));

    return reply.code(200).send({ success: true, data: dispoIssues });
};

export const assignMaintainerToDispoIssue = async (
  request: FastifyRequest<{ Params: { id: string }, Body: { maintainerId: number } }>,
  reply: FastifyReply
) => {
    const { id } = request.params;
    const { maintainerId } = request.body;
    
    const updatedDispoIssue = await DispoIssueService.assignMaintainerToDispoIssue(Number(id), maintainerId);
    return reply.code(200).send({ success: true, data: updatedDispoIssue });
};

export const updateDispoIssue = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateDispoIssueInput }>,
  reply: FastifyReply
) => {
    const { id } = request.params;
    const dispoIssueData = request.body;
    
    const updatedDispoIssue = await DispoIssueService.updateDispoIssue(Number(id), dispoIssueData);
    return reply.code(200).send({ success: true, data: updatedDispoIssue });
};

export const deleteDispoIssue = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
    const { id } = request.params;
    await DispoIssueService.deleteDispoIssue(Number(id));
    return reply.code(200).send({ success: true, message: 'DispoIssue deleted successfully' });
};

