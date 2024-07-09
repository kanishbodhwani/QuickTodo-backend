import Fastify from 'fastify';
import cors from 'fastify-cors';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(cors, { 
  origin: '*',
});

fastify.get('/api/users/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (user) {
    reply.send(user);
  } else {
    reply.code(404).send({ error: 'User not found' });
  }
});

fastify.post('/api/users', async (request, reply) => {
  const { id, username } = request.body as { id: string; username: string };
  
  try {
    const newUser = await prisma.user.create({
      data: { id, username },
    });
    reply.code(201).send(newUser);
  } catch (error) {
    reply.code(500).send({ error: 'Error creating user' });
  }
});

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
