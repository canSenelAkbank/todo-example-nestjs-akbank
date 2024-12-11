import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todos.entity';
import { UUID } from 'crypto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    const data = await this.todoService.findAll();
    return data;
  }

  @Post()
  async createdTodo(@Body() todoData: Partial<Todo>): Promise<Todo> {
    return await this.todoService.create(todoData);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: UUID) {
    return await this.todoService.findOne(id);
  }

  @Get('names/:name')
  async getTodoByName(@Param('name') name: string) {
    return await this.todoService.findFirstByName(name);
  }

  // @Post()
  // async createAndGetByDescription(
  //   @Body() todoData: Partial<Todo>,
  // ): Promise<Todo> {
  //   return await this.todoService.createAndFindByDescription(todoData);
  // }
}
