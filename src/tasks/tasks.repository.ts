import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './Dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum.ts';

@Injectable()
export class TasksRepository {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  async getTasks(): Promise<Task[]> {
    return await this.repository.find();
  }

  async getById(id: string): Promise<Task> {
    return await this.repository.findOneBy({ id });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.repository.save(newTask);
  }

  async deleteById(id: string) {
    const task = await this.getById(id);

    return await this.repository.remove(task);
  }

  async save(task: Task) {
    return await this.repository.save(task);
  }
}
