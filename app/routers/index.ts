import exampleRoutes from './example.routes';
import InterventionRoutes from './intervention/intervention.routes';
import dispoIssueRoutes from './dispoIssue/dispoIssue.routes'

import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(exampleRoutes, { prefix: '/example' });
  
  fastify.register(InterventionRoutes, { prefix: '/intervention' });

  fastify.register(dispoIssueRoutes, { prefix: '/dispoIssue' });


};

export default registerRoutes;


