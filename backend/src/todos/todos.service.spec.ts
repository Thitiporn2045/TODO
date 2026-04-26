import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  let service: TodosService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: repository,
        },
      ],
    }).compile();

    service = moduleRef.get(TodosService);
  });

  it('creates todos with a clean title', async () => {
    const created = { title: 'Buy milk' };
    repository.create.mockReturnValue(created);
    repository.save.mockResolvedValue({ id: '1', ...created });

    await service.create({ title: 'Buy milk' });

    expect(repository.create).toHaveBeenCalledWith({
      title: 'Buy milk',
    });
  });

  it('throws when updating a missing todo', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.update('missing', { completed: true })).rejects.toBeInstanceOf(NotFoundException);
  });
});
