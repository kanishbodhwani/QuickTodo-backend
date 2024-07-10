import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/userController';

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.get('/api/users/:id', UserController.getUser);
  fastify.post('/api/users', UserController.createUser);
};