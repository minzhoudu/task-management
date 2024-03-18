import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './Dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './Dtos/get-tasks-filter.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksRepository {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.repository.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async getById(id: string, user: User): Promise<Task> {
    return await this.repository.findOneBy({ id, user });
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return await this.repository.save(newTask);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async save(task: Task) {
    return await this.repository.save(task);
  }
}
