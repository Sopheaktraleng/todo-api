// create-task.dto.ts
import { IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
