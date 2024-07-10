import prisma from '../config/database';

export class TodoService {
  static async createTodo(listId: string, title: string, description: string) {
    return prisma.todo.create({
      data: {
        listId,
        title,
        description,
      },
    });
  }

  static async updateTodo(id: string, title: string, description: string) {
    return prisma.todo.update({
      where: { id },
      data: { title, description },
    });
  }

  static async deleteTodo(id: string) {
    return prisma.todo.delete({
      where: { id },
    });
  }

  static async completeTodo(id: string) {
    return prisma.todo.update({
      where: { id },
      data: { completed: true },
    });
  }
}