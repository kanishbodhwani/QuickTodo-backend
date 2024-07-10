import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';

export class UserController {
  static async getUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const user = await UserService.getUserById(id);

    if (user) {
      reply.send(user);
    } else {
      reply.code(404).send({ error: 'User not found' });
    }
  }

  static async createUser(request: FastifyRequest, reply: FastifyReply) {
    const { id, username } = request.body as { id: string; username: string };

    try {
      const newUser = await UserService.createUser(id, username);
      reply.code(201).send(newUser);
    } catch (error) {
      reply.code(500).send({ error: 'Error creating user' });
    }
  }
}