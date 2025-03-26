import { FastifyInstance } from 'fastify';
import {
  createDispoIssue,
  getDispoIssues,
  getDispoIssueById,
  getDispoIssuesByDispositiveId,
  assignMaintainerToDispoIssue,
  updateDispoIssue,
  deleteDispoIssue
} from '../../handlers/dispoIssueHandler';
import {
  createDispoIssueSchema,
  getDispoIssuesSchema,
  getDispoIssueByIdSchema,
  getDispoIssuesByDispositiveIdSchema,
  assignMaintainerToDispoIssueSchema,
  updateDispoIssueSchema,
  deleteDispoIssueSchema
} from './dispoIssue.schema';

const dispoIssueRoutes = async (fastify: FastifyInstance) => {
  // Créer un nouveau DispoIssue
  fastify.post('/', { schema: createDispoIssueSchema }, createDispoIssue);
 
  // Récupérer tous les DispoIssues
  fastify.get('/', { schema: getDispoIssuesSchema }, getDispoIssues);
 
  // Récupérer un DispoIssue par son ID
  fastify.get('/:id', { schema: getDispoIssueByIdSchema }, getDispoIssueById);
 
  // Récupérer les DispoIssues par dispositiveId
  fastify.get('/dispositive/:dispositiveId/issues', { schema: getDispoIssuesByDispositiveIdSchema }, getDispoIssuesByDispositiveId);
 
  // Assigner un mainteneur à un DispoIssue
  fastify.patch('/:id/assign', { schema: assignMaintainerToDispoIssueSchema }, assignMaintainerToDispoIssue);
   
  // Mettre à jour un DispoIssue
  fastify.put('/:id', { schema: updateDispoIssueSchema }, updateDispoIssue);
 
  // Supprimer un DispoIssue
  fastify.delete('/:id', { schema: deleteDispoIssueSchema }, deleteDispoIssue);
};

export default dispoIssueRoutes;