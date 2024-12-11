import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async create(todoData: Partial<Todo>): Promise<any> {
    // const newTodo = this.todoRepository.insert(todoData);
    await this.todoRepository.insert(todoData);
    return 'ok';
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    return todo;
  }

  async findFirst(id: string): Promise<Todo> {
    const todo = await this.todoRepository.find({ where: { id } })[0];
    return todo.title;
  }

  async findFirstByName(name: string): Promise<Todo> {
    const todo = await this.todoRepository.find({ where: { title: name } })[0];
    return todo.id;
  }

  async deleteById(id: string): Promise<any> {
    await this.todoRepository.delete(id);
    return 'ok';
  }

  // async createAndFindByDescription(todoData: Partial<Todo>): Promise<any> {
  //   this.todoRepository.insert(todoData);
  //   const todoTest = this.todoRepository.find({
  //     where: {
  //       description: todoData.description,
  //     },
  //   });
  //   return todoTest;
  // }
}
