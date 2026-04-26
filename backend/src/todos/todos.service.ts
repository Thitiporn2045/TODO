import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll() {
    return this.todoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create({
      title: dto.title,
    });

    return this.todoRepository.save(todo);
  }

  async update(id: string, dto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (dto.title !== undefined) {
      todo.title = dto.title;
    }
    if (dto.completed !== undefined) {
      todo.completed = dto.completed;
    }

    return this.todoRepository.save(todo);
  }

  async remove(id: string) {
    const result = await this.todoRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Todo not found');
    }

    return { deleted: true };
  }
}
