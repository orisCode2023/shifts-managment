import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }
  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Public()
  @Post()
  create(@Body() user: { name: string; email: string; password: string; role: string }) {
    return this.usersService.createUser(user);
  }
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatedUser: { name: string; role: string },
  ) {
    return this.usersService.updateUser(+id, updatedUser);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.removeUser(+id);
  }
}
