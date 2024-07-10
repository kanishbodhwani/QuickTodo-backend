import { FastifyInstance } from 'fastify';
import { userRoutes } from './userRoutes';
import { todoRoutes } from './todoRoutes';
import { listRoutes } from './listRoutes';

export const routes = (fastify: FastifyInstance) => {
  userRoutes(fastify);
  todoRoutes(fastify);
  listRoutes(fastify);
};