import prisma from '../config/database';

export class ListService {
  static async createList(title: string, userId: string) {
    return prisma.list.create({
      data: {
        title,
        user: { connect: { id: userId } },
      },
    });
  }

  static async getLists(userId: string) {
    return prisma.list.findMany({
      where: {
        userId,
      },
    });
  }
}
