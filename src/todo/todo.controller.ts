import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { GetUser } from 'src/auth/decorator';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { EditTodoDTO } from './dto/edit-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('all')
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @UseGuards(JwtGuard)
  @Get()
  getTodos(@GetUser('id') userId: number) {
    return this.todoService.getTodos(userId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createTodo(@GetUser('id') userid: number, @Body() dto: CreateTodoDTO) {
    return this.todoService.createTodo(userid, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editTodo(
    @GetUser('id') userid: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: EditTodoDTO,
  ) {
    return this.todoService.editTodo(userid, todoId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteTodo(
    @GetUser('id') userid: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.deleteTodo(userid, todoId);
  }
}
