import { FastifyInstance } from 'fastify';
import { ListController } from '../controllers/listController';

export const listRoutes = (fastify: FastifyInstance) => {
  fastify.post('/api/lists', ListController.createList);
  fastify.get('/api/lists', ListController.getLists);
};