import { Controller, Get , Post, Body, Param, Patch, Delete} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }

    @Get()
    @Roles(Role.Commander, Role.Soldier)
    findAll() {
        return this.shiftsService.findAll();
    }
    @Post()
    @Roles(Role.Commander)
    create(@Body() assignment: {  name: string; startTime: string; endTime: string; location: string  }) {
        return this.shiftsService.createShift(assignment);
    }


    @Get(':id')
    @Roles(Role.Commander, Role.Soldier)
    findOne(@Param('id') id: string) {
        return this.shiftsService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.Commander)
    update(@Param('id') id: string, @Body() updatedshift: {  name: string; startTime: string; endTime: string; location: string  }) {
        return this.shiftsService.updateShift(+id, updatedshift);
    }

    @Delete(':id')
    @Roles(Role.Commander)
    remove(@Param('id') id: string) {
        return this.shiftsService.removeShift(+id);
    }
}
