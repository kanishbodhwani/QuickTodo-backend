import prisma from '../config/database';

export class UserService {
  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async createUser(id: string, username: string) {
    return prisma.user.create({
      data: { id, username },
    });
  }
}