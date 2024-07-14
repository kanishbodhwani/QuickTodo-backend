import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../config/database';

export const replicacheRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/api/replicache/pull',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { clientID, lastMutationID } = request.body as { clientID: string, lastMutationID: number };
      const changes = await getChanges(clientID, lastMutationID);
      reply.send(changes);
    }
  );

  fastify.post(
    '/api/replicache/push',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { clientID, mutations } = request.body as { clientID: string, mutations: Array<any> };
      await applyMutations(clientID, mutations);
      reply.send({});
    }
  );
};

const getChanges = async (clientID: string, lastMutationID: number) => {
  // Fetch changes since lastMutationID from your database
  const changes = await prisma.$queryRaw`
    SELECT * FROM Changes
    WHERE client_id = ${clientID} AND mutation_id > ${lastMutationID}
    ORDER BY mutation_id ASC
  `;
  
  return {
    lastMutationID,
    changes,
  };
};

const applyMutations = async (clientID: string, mutations: Array<any>) => {
  for (const mutation of mutations) {
    switch (mutation.name) {
      case 'createUser':
        await handleCreateUser(
            clientID,
            mutation.args.id,
            mutation.args.username
        );
        break;
      // Add more cases for other mutations
    }
  }
};

const getNextMutationID = async () => {
    const nextID = await prisma.change.count();
    return nextID + 1;
}

const handleCreateUser = async (
    clientID: string,
    id: string,
    username: string
) => {
  try {
    await prisma.user.create({
      data: { id, username },
    });

    const mutationID = await getNextMutationID();

    await prisma.change.create({
        data: {
            mutation_id: mutationID,
            client_id: clientID,
            operation: 'INSERT',
            table: 'User',
            row_id: id, 
            new_value: {id, username}
        }
    });
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};