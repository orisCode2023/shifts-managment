import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
    
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  create(@Body() shift: { userId: number; shiftId: number}) {
    return this.assignmentsService.createShift(shift);
  }

  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedShift: { userId: number; shiftId: number }) {
    return this.assignmentsService.updateShift(+id, updatedShift);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.removeShift(+id);
  }
}


