import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './Dtos/create-task.dto';
import { GetTasksFilterDto } from './Dtos/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum.ts';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.getById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} not found...`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.create(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.deleteById(id);

    if (result.affected === 0)
      throw new NotFoundException(`Task with ID: ${id} not found...`);
  }

  async updateStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);
    task.status = status;

    return await this.taskRepository.save(task);
  }
}
