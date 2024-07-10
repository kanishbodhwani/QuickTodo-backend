import { FastifyRequest, FastifyReply } from 'fastify';
import { ListService } from '../services/listService';

export class ListController {
  static async createList(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { title, userId } = request.body as { title: string; userId: string }; // Assuming userId is passed in request body
      const newList = await ListService.createList(title, userId);
      reply.code(201).send(newList);
    } catch (error) {
      console.error('Error creating list:', error);
      reply.code(500).send({ error: 'Error creating list' });
    }
  }

  static async getLists(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as { userId: string }; // Assuming userId is passed as a parameter
      const lists = await ListService.getLists(userId);
      reply.send(lists);
    } catch (error) {
      console.error('Error fetching lists:', error);
      reply.code(500).send({ error: 'Error fetching lists' });
    }
  }
}