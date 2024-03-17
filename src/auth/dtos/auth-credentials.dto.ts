import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain 1 upper case letter, 1 lower case letter, and 1 number.',
  })
  password: string;
}
