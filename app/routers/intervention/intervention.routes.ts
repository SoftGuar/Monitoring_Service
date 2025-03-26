import { FastifyInstance } from 'fastify';
import { 
  createIntervention, 
  getInterventions, 
  getInterventionById, 
  updateIntervention, 
  deleteIntervention,
  getInterventionsByMaintainerId,
  updateInterventionStatus 
} from '../../handlers/interventionHandler';
import { 
  createInterventionSchema, 
  deleteInterventionSchema, 
  getInterventionByIdSchema, 
  getInterventionsSchema, 
  updateInterventionSchema,
  updateInterventionStatusSchema,
  getInterventionsByMaintainerSchema
} from './intervention.schema';

const InterventionRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createInterventionSchema }, createIntervention);
  fastify.get('/', { schema: getInterventionsSchema }, getInterventions);
  fastify.get('/:id', { schema: getInterventionByIdSchema }, getInterventionById);
  fastify.put('/:id', { schema: updateInterventionSchema }, updateIntervention);
  fastify.delete('/:id', { schema: deleteInterventionSchema }, deleteIntervention);
  fastify.get('/maintainer/:idMaintainer', { schema: getInterventionsByMaintainerSchema },  getInterventionsByMaintainerId); 
  fastify.patch('/:id/status',  { schema: updateInterventionStatusSchema },  updateInterventionStatus);
};

export default InterventionRoutes;