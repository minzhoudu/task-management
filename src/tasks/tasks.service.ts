import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './Dtos/create-task.dto';
import { GetTasksFilterDto } from './Dtos/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.getById(id, user);

    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} not found...`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.create(createTaskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.deleteById(id);

    if (result.affected === 0)
      throw new NotFoundException(`Task with ID: ${id} not found...`);
  }

  async updateStatus(
    taskId: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(taskId, user);
    task.status = status;

    return await this.taskRepository.save(task);
  }
}
