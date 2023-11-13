import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ForbiddenError } from '@nestjs/apollo';
import { EditTodoDTO } from './dto/edit-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  getAllTodos() {
    return this.prisma.todo.findMany();
  }

  getTodos(userId: number) {
    return this.prisma.todo.findMany({ where: { id: userId } });
  }

  createTodo(userId: number, dto: CreateTodoDTO) {
    return this.prisma.todo.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async editTodo(userId: number, todoId: number, dto: EditTodoDTO) {
    const todo = await this.prisma.todo.findUnique({ where: { id: todoId } });

    if (!todo || todo.userId !== userId) {
      throw new ForbiddenError('Access to resource denied');
    }

    return this.prisma.todo.update({ where: { id: todoId }, data: { ...dto } });
  }

  async deleteTodo(userId: number, todoId: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id: todoId } });

    if (!todo || todo.userId !== userId) {
      throw new ForbiddenError('Access to resource denied');
    }

    return this.prisma.todo.delete({ where: { id: todoId } });
  }
}
