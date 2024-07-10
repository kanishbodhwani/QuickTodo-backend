import { FastifyInstance } from 'fastify';
import { TodoController } from '../controllers/todoController';

export const todoRoutes = (fastify: FastifyInstance) => {
  fastify.post('/api/todos', TodoController.createTodo);
  fastify.put('/api/todos/:id', TodoController.updateTodo);
  fastify.delete('/api/todos/:id', TodoController.deleteTodo);
  fastify.patch('/api/todos/:id/complete', TodoController.completeTodo);
};