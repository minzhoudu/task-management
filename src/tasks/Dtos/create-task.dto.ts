import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Naziv mora biti definisan' })
  title: string;

  @IsNotEmpty({ message: 'Deskripcija mora biti definisana' })
  description: string;
}
