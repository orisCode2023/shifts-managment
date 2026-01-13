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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }
  @Post()
  createUser(@Body() user: { name: string; roll: string }) {
    return this.usersService.createUser(user);
  }
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatedUser: { name: string; roll: string },
  ) {
    return this.usersService.updateUser(+id, updatedUser);
  }
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(+id);
  }
}
