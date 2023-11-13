import { IsOptional, IsString } from 'class-validator';

export class EditTodoDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
