import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './Dtos/create-task.dto';
import { GetTasksFilterDto } from './Dtos/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: uuid(),
      title: 'Task 1',
      description: 'Description 1',
      status: TaskStatus.OPEN,
    },
    {
      id: uuid(),
      title: 'Task 2',
      description: 'Description 2',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.tasks;

    if (status) {
      tasks = tasks.filter(
        (task) => task.status.toLowerCase() === status.toLowerCase(),
      );
    }

    if (search) {
      tasks = tasks.filter((task) => {
        const searchTerms = `${task.title} ${task.description}`;

        return searchTerms.toLowerCase().includes(search.toLowerCase());
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateStatus(taskId: string, status: TaskStatus): Task | NotFoundException {
    const task = this.getTaskById(taskId);
    if (!task) {
      return new NotFoundException('Task not found');
    }

    task.status = status;

    return task;
  }
}
