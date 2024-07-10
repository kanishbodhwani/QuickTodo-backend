import { FastifyRequest, FastifyReply } from 'fastify';
import { TodoService } from '../services/todoService';

interface CreateTodoRequestBody {
  listId: string;
  title: string;
  description?: string;
}

interface UpdateTodoRequestBody {
  id: string;
  title: string;
  description?: string;
}

export class TodoController {
  static async createTodo(
    request: FastifyRequest<{ Body: CreateTodoRequestBody }>,
    reply: FastifyReply
  ) {
    const { listId, title, description } = request.body;
    try {
      const newTodo = await TodoService.createTodo(listId, title, description || '');
      reply.code(201).send(newTodo);
    } catch (error) {
      reply.code(500).send({ error: 'Error creating todo' });
    }
  }

  static async updateTodo(
    request: FastifyRequest<{ Body: UpdateTodoRequestBody }>,
    reply: FastifyReply
  ) {
    const { id, title, description } = request.body;
    try {
      const updatedTodo = await TodoService.updateTodo(id, title, description || '');
      reply.send(updatedTodo);
    } catch (error) {
      reply.code(500).send({ error: 'Error updating todo' });
    }
  }

  static async deleteTodo(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    try {
      await TodoService.deleteTodo(id);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({ error: 'Error deleting todo' });
    }
  }

  static async completeTodo(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    try {
      const completedTodo = await TodoService.completeTodo(id);
      reply.send(completedTodo);
    } catch (error) {
      reply.code(500).send({ error: 'Error completing todo' });
    }
  }
}
