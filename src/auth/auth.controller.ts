import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }
  
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  signUp(@Body() user: { name: string; email: string; password: string; role: string }) {
    return this.authService.signUp(user);
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
