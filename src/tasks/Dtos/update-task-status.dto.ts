import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: 'Status must be either OPEN, IN_PROGRESS or DONE',
  })
  status: TaskStatus;
}
