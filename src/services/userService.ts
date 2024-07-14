import prisma from '../config/database';

export class UserService {
  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async createUser(id: string, username: string, clientID: string, mutationID: number) {
    const user = await prisma.user.create({
      data: { id, username },
    });
    await prisma.change.create({
      data: {
        mutation_id: mutationID,
        client_id: clientID,
        operation: 'INSERT',
        table: 'User',
        row_id: id,
        new_value: user,
      },
    });
    return user;
  }

  static async getChanges(clientID: string, lastMutationID: number) {
    const changes = await prisma.change.findMany({
      where: {
        client_id: clientID,
        mutation_id: { gt: lastMutationID },
      },
      orderBy: { mutation_id: 'asc' },
    });
    return changes;
  }

  static async applyMutations(mutations: Array<any>) {
    for (const mutation of mutations) {
      switch (mutation.name) {
        case 'createUser':
          await UserService.createUser(mutation.args.id, mutation.args.username, mutation.clientID, mutation.id);
          break;
        // Add more cases for other mutations
      }
    }
  }
}