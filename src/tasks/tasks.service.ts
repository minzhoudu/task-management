import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './Dtos/create-task.dto';
import { GetTasksFilterDto } from './Dtos/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum.ts';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    let tasks = await this.taskRepository.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status.toUpperCase());
    }

    if (search) {
      tasks = tasks.filter((task) => {
        const searchTerms = `${task.title} ${task.description}`;

        return searchTerms.toLowerCase().includes(search.toLowerCase());
      });
    }

    return tasks;
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

  async deleteTask(id: string): Promise<Task> {
    return await this.taskRepository.deleteById(id);
  }

  async updateStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);
    task.status = status;

    return await this.taskRepository.save(task);
  }
}
