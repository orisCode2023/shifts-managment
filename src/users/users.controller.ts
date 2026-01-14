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
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Commander, Role.Soldier)
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  @Roles(Role.Commander, Role.Soldier)
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }
  @Get(':username')
  @Roles(Role.Commander, Role.Soldier)
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Post()
  @Roles(Role.Commander, Role.Soldier)
  create(@Body() user: { name: string; email: string; password: string; role: string }) {
    return this.usersService.createUser(user);
  }
  @Patch(':id')
  @Roles(Role.Commander, Role.Soldier)
  update(
    @Param('id') id: string,
    @Body() updatedUser: { name: string; role: string },
  ) {
    return this.usersService.updateUser(+id, updatedUser);
  }
  @Delete(':id')
  @Roles(Role.Commander)
  remove(@Param('id') id: number) {
    return this.usersService.removeUser(+id);
  }
}
