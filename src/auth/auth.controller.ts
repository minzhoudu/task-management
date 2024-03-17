import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAllUsers() {
    return await this.authService.getUsers();
  }

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.createUser(authCredentialsDto);
  }
}
