import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('assignments')
export class AssignmentsController {
    
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @Roles(Role.Commander)
  create(@Body() assignment: { userId: number; shiftId: number}) {
    return this.assignmentsService.createShift(assignment);
  }

  @Get()
  @Roles(Role.Commander, Role.Soldier)  
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Commander, Role.Soldier)
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Commander)
  update(@Param('id') id: string, @Body() updatedAssignment: { userId: number; shiftId: number }) {
    return this.assignmentsService.updateShift(+id, updatedAssignment);
  }

  @Delete(':id')
  @Roles(Role.Commander)
  remove(@Param('id') id: string) {
    return this.assignmentsService.removeShift(+id);
  }
}


