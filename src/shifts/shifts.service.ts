import { Injectable } from '@nestjs/common';

@Injectable()
export class ShiftsService {
    private shifts = [
        { id: 1, name: 'Morning Shift', startTime: '08:00-16:00', endTime: '16:00', location: 'Base A' },
        { id: 2, name: 'Evening Shift', startTime: '16:00-00:00', endTime: '00:00', location: 'Base B' },
    ]; 

    findAll() {
        return this.shifts;
    }

}