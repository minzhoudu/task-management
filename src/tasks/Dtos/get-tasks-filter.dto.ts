import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum.ts';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be either OPEN, IN_PROGRESS or DONE',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
