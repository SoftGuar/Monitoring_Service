import { FastifyInstance } from 'fastify';
import { 
  createIntervention, 
  getInterventions, 
  getInterventionById, 
  updateIntervention, 
  deleteIntervention,
  getInterventionsByMaintainerId,
  updateInterventionReport,
  updateInterventionStatus ,
  getInterventionsByDeviceId
} from '../../handlers/interventionHandler';
import { 
  createInterventionSchema, 
  deleteInterventionSchema, 
  getInterventionByIdSchema, 
  getInterventionsSchema, 
  updateInterventionSchema,
  updateInterventionStatusSchema,
  updateInterventionReportSchema,
  getInterventionsByMaintainerSchema,
  getInterventionsByidDeviceSchema
} from './intervention.schema';

const InterventionRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createInterventionSchema }, createIntervention);
  fastify.get('/', { schema: getInterventionsSchema }, getInterventions);
  fastify.get('/:id', { schema: getInterventionByIdSchema }, getInterventionById);
  fastify.put('/:id', { schema: updateInterventionSchema }, updateIntervention);
  fastify.delete('/:id', { schema: deleteInterventionSchema }, deleteIntervention);
  fastify.get('/maintainer/:idMaintainer', { schema: getInterventionsByMaintainerSchema },  getInterventionsByMaintainerId); 
  fastify.get('/device/:idDispositive', { schema: getInterventionsByidDeviceSchema },  getInterventionsByDeviceId); 

  fastify.patch('/:id/status',  { schema: updateInterventionStatusSchema },  updateInterventionStatus);
  fastify.put('/:id/report', { schema: updateInterventionReportSchema }, updateInterventionReport);
};

export default InterventionRoutes;